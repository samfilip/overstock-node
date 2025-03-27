import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../types/express/api';

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
  console.error(`${err.name}: ${err.message}`);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};