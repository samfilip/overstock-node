import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { reverbRouter } from './routes/reverb.js';
import { ApiError } from './types/express/api';


const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('I still got it');
});

app.get('/health', (req: Request, res: Response) => {
  res.send('hey buddy, I\'m here');
});

app.use(express.json());

app.use('/api', reverbRouter());

const errorHandler: ErrorRequestHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
