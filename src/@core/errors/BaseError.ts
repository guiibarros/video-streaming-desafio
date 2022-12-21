export class BaseError extends Error {
  public readonly statusCode: number;

  public constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
