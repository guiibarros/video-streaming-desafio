import { BaseError } from '@core/errors/BaseError';

export class TagNotFoundError extends BaseError {
  public constructor() {
    super('Tag not found.', 404);
  }
}
