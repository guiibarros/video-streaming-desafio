import { BaseError } from '@core/errors/BaseError';

export class TokenMustBeProvidedError extends BaseError {
  public constructor() {
    super('Jwt token must be provided.', 401);
  }
}
