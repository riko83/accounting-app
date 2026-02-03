import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Accounting API 🇦🇱',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Mirësevini në Accounting API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      clients: '/api/clients',
      documents: '/api/documents'
    }
  });
});

app.listen(PORT, () => {
  console.log('========================================');
  console.log('🚀 Accounting App Started Successfully!');
  console.log('========================================');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
  console.log('========================================');
});