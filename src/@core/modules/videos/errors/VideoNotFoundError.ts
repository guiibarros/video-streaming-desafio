import { BaseError } from '@core/errors/BaseError';

export class VideoNotFoundError extends BaseError {
  public constructor() {
    super('Video not found.', 404);
  }
}
