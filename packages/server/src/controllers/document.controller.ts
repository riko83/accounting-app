import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import { ApiResponse, Document, UploadDocumentRequest } from '@accounting/shared';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

interface AuthRequest extends Request {
  user?: any;
  file?: any;
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'));
    }
  }
}).single('file');

export const getDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            name: true,
            nipt: true
          }
        }
      }
    });

    const response: ApiResponse<Document[]> = {
      success: true,
      data: documents,
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Get documents error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch documents',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};

export const uploadDocument = async (req: AuthRequest, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error('Upload error:', err);
      const response: ApiResponse = {
        success: false,
        error: err.message || 'File upload failed',
        timestamp: new Date()
      };
      return res.status(400).json(response);
    }

    if (!req.file) {
      const response: ApiResponse = {
        success: false,
        error: 'No file uploaded',
        timestamp: new Date()
      };
      return res.status(400).json(response);
    }

    try {
      const { clientId, type, description } = req.body;

      // Verify client belongs to user
      const client = await prisma.client.findFirst({
        where: {
          id: clientId,
          userId: req.user.id
        }
      });

      if (!client) {
        // Delete uploaded file
        fs.unlinkSync(req.file.path);
        
        const response: ApiResponse = {
          success: false,
          error: 'Client not found or access denied',
          timestamp: new Date()
        };
        return res.status(404).json(response);
      }

      const document = await prisma.document.create({
        data: {
          name: req.file.originalname,
          type: type || 'OTHER',
          fileUrl: `/uploads/${req.file.filename}`,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          description: description,
          clientId: clientId,
          userId: req.user.id,
          metadata: {
            originalName: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype
          }
        }
      });

      // Emit socket event
      const io = req.app.get('io');
      if (io) {
        io.to(`user:${req.user.id}`).emit('document:uploaded', document);
        io.to(`client:${clientId}`).emit('document:new', document);
      }

      const response: ApiResponse<Document> = {
        success: true,
        message: 'Document uploaded successfully',
        data: document,
        timestamp: new Date()
      };

      res.status(201).json(response);
    } catch (error) {
      logger.error('Create document error:', error);
      
      // Delete uploaded file on error
      if (req.file?.path) {
        fs.unlinkSync(req.file.path);
      }
      
      const response: ApiResponse = {
        success: false,
        error: 'Failed to save document',
        timestamp: new Date()
      };
      res.status(500).json(response);
    }
  });
};

export const deleteDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const document = await prisma.document.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!document) {
      const response: ApiResponse = {
        success: false,
        error: 'Document not found or access denied',
        timestamp: new Date()
      };
      return res.status(404).json(response);
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '../../../../', document.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.document.delete({
      where: { id }
    });

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user:${req.user.id}`).emit('document:deleted', id);
      io.to(`client:${document.clientId}`).emit('document:deleted', id);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Document deleted successfully',
      timestamp: new Date()
    };

    res.json(response);
  } catch (error) {
    logger.error('Delete document error:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete document',
      timestamp: new Date()
    };
    res.status(500).json(response);
  }
};