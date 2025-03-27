import { Request, Response, NextFunction } from 'express';

export function validateDateParams(req: Request, res: Response, next: NextFunction): void {
  const { created_start_date, created_end_date } = req.query;
  
  if (!created_start_date && !created_end_date) {
    return next();
  }
  
  if (!created_start_date || !created_end_date) {
    res.status(400).json({
      success: false,
      message: 'Both start and end dates must be provided together'
    });
    return;
  }

  if (typeof created_start_date !== 'string' || typeof created_end_date !== 'string') {
    res.status(400).json({
      success: false,
      message: 'Dates must be strings in YYYY-MM-DD format'
    });
    return;
  }
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(created_start_date) || !dateRegex.test(created_end_date)) {
    res.status(400).json({
      success: false,
      message: 'Dates must be in YYYY-MM-DD format'
    });
    return;
  }
  
  const startDate = new Date(created_start_date);
  const endDate = new Date(created_end_date);
  
  if (startDate > endDate) {
    res.status(400).json({
      success: false,
      message: 'Start date must be before end date'
    });
    return;
  }
  
  next();
}