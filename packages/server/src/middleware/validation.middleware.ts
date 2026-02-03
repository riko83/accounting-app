import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '@accounting/shared';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      error: 'Validation failed',
      data: errors.array(),
      timestamp: new Date()
    };
    
    return res.status(400).json(response);
  }
  
  next();
};