import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '@accounting/shared';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const response: ApiResponse = {
        success: false,
        error: 'No token provided',
        timestamp: new Date()
      };
      return res.status(401).json(response);
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: 'Invalid or expired token',
      timestamp: new Date()
    };
    res.status(401).json(response);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const response: ApiResponse = {
        success: false,
        error: 'Authentication required',
        timestamp: new Date()
      };
      return res.status(401).json(response);
    }

    if (!roles.includes(req.user.role)) {
      const response: ApiResponse = {
        success: false,
        error: 'Insufficient permissions',
        timestamp: new Date()
      };
      return res.status(403).json(response);
    }

    next();
  };
};