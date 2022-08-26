class AppError extends Error {
  public readonly _statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
  }
}

export default AppError;
