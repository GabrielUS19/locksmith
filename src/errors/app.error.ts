export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: Array<string>;

  constructor(message: string, statusCode = 400, errors: Array<string> = []) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
  }
}
