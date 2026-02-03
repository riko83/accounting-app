import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiResponse } from '@accounting/shared';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  const response: ApiResponse = {
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : message,
    timestamp: new Date()
  };

  res.status(statusCode).json(response);
};