import { BaseError } from '@core/errors/BaseError';

export class IncorrectEmailOrPasswordError extends BaseError {
  public constructor() {
    super('Incorrect email or password', 401);
  }
}
