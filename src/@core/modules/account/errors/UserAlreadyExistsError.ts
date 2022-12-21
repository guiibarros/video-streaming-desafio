import { BaseError } from '@core/errors/BaseError';

export class UserAlreadyExistsError extends BaseError {
  public constructor() {
    super('User already exists.');
  }
}
