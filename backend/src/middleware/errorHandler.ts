import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err instanceof AppError ? err : new AppError(500, 'Internal server error');
  
  console.error(`[${new Date().toISOString()}] Error:`, error.message);
  
  res.status(error.statusCode).json({
    error: error.message,
    statusCode: error.statusCode
  });
};
