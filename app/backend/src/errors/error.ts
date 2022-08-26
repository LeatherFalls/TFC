import { NextFunction, Request, Response } from 'express';
import AppError from './app.error';

const errorMiddleware = (
  error: Error & Partial<AppError>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const code = error._statusCode ?? 500;

  const message = error._statusCode ? error.message : 'Internal server error';

  return res.status(code).json({ message });
};

export default errorMiddleware;
