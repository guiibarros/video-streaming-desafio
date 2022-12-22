import { Tag } from '@core/modules/videos/entities/Tag';

interface ITagToHTTP {
  id: string;
  name: string;
  createdAt: Date;
}

export class TagViewModel {
  private constructor() {}

  public static toHTTP(tag: Tag): ITagToHTTP {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
    };
  }
}
