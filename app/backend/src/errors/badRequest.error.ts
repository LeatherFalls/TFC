import AppError from './app.error';

class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BadRequestError;
