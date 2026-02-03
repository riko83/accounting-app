import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import clientRoutes from './routes/client.routes';
import documentRoutes from './routes/document.routes';
import { errorHandler } from './middleware/error.middleware';
import { ApiResponse } from '@accounting/shared';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Create HTTP server for Socket.io
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    credentials: true
  }
});

// Socket.io connection handler
io.on('connection', (socket) => {
  logger.info(`🔌 Socket connected: ${socket.id}`);
  
  socket.on('join:client', (clientId: string) => {
    socket.join(`client:${clientId}`);
    logger.info(`Socket ${socket.id} joined client:${clientId}`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// Make io accessible in routes
app.set('io', io);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Accounting App API',
      version: '1.0.0',
      description: 'API for Albanian Accounting Application',
      contact: {
        name: 'API Support',
        email: 'support@accounting.app'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'Accounting API is healthy',
    timestamp: new Date()
  };
  res.json(response);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/documents', documentRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome endpoint
app.get('/api', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: '🇦🇱 Mirësevini në Accounting API',
    data: {
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        clients: '/api/clients',
        documents: '/api/documents',
        health: '/api/health',
        docs: '/api-docs'
      }
    },
    timestamp: new Date()
  };
  res.json(response);
});

// 404 handler
app.use('*', (req, res) => {
  const response: ApiResponse = {
    success: false,
    error: 'Route not found',
    timestamp: new Date()
  };
  res.status(404).json(response);
});

// Error handling middleware
app.use(errorHandler);

// Start server
httpServer.listen(PORT, () => {
  logger.info(`========================================`);
  logger.info(`🚀 Accounting App Server Started!`);
  logger.info(`========================================`);
  logger.info(`📡 Server: http://localhost:${PORT}`);
  logger.info(`🌐 Client: ${CLIENT_URL}`);
  logger.info(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  logger.info(`🔌 WebSocket: ws://localhost:${PORT}`);
  logger.info(`🗄️  Database: SQLite (no Docker needed!)`);
  logger.info(`========================================`);
  logger.info(`👤 Default Credentials:`);
  logger.info(`   Admin: admin@accounting.app / admin123`);
  logger.info(`   Accountant: accountant@accounting.app / accountant123`);
  logger.info(`========================================`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export { app, io };