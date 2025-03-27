import { Request, Response, NextFunction } from 'express';

export const verifyReverbToken = (req: Request, res: Response, next: NextFunction): void => {
  if (!process.env.REVERB_API_KEY) {
    res.status(500).json({
      success: false,
      message: 'Reverb API key not configured'
    });
  }
  req.reverbToken = process.env.REVERB_API_KEY;
  
  next();
};