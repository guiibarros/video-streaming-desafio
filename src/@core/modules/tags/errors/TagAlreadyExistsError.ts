import { BaseError } from '@core/errors/BaseError';

export class TagAlreadyExistsError extends BaseError {
  public constructor() {
    super('Tag already exists.');
  }
}
