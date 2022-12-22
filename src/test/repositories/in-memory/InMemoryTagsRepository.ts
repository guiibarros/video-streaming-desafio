import { Tag } from '@core/modules/videos/entities/Tag';
import { ITagsRepository } from '@core/modules/videos/repositories/ITagsRepository';

export class InMemoryTagsRepository implements ITagsRepository {
  public readonly tags: Tag[] = [];

  public async create(tag: Tag): Promise<void> {
    this.tags.push(tag);
  }

  public async findById(tagId: string): Promise<Tag | null> {
    const tag = this.tags.find((tag) => tag.id === tagId);

    if (!tag) {
      return null;
    }

    return tag;
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

  public async save(tag: Tag): Promise<void> {
    const tagIndex = this.tags.findIndex((tagItem) => tagItem.id === tag.id);

    this.tags[tagIndex] = tag;
  }

  public async deleteById(tagId: string): Promise<void> {
    const tagIndex = this.tags.findIndex((tagItem) => tagItem.id === tagId);

    this.tags.splice(tagIndex, 1);
  }
}
