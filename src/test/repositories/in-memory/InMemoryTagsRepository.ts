import { Tag } from '@core/modules/tags/entities/Tag';
import { ITagsRepository } from '@core/modules/tags/repositories/ITagsRepository';

export class InMemoryTagsRepository implements ITagsRepository {
  public readonly tags: Tag[] = [];

  public async create(tag: Tag): Promise<void> {
    this.tags.push(tag);
  }

  public async findByName(name: string): Promise<Tag | null> {
    const tag = this.tags.find((tag) => tag.name === name);

    if (!tag) {
      return null;
    }

    return tag;
  }

  public async findMany(): Promise<Tag[]> {
    return this.tags;
  }
}
