import AppError from './app.error';

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export default NotFoundError;
