import { ITagProps, Tag } from '@core/modules/tags/entities/Tag';

export class TagFactory {
  private constructor() {}

  public static make(override: Partial<ITagProps> = {}): Tag {
    return new Tag({
      name: 'test',
      ...override,
    });
  }
}
