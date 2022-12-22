import { Tag } from '../entities/Tag';

export abstract class ITagsRepository {
  public abstract create(tag: Tag): Promise<void>;
  public abstract findById(tagId: string): Promise<Tag | null>;
  public abstract findByName(name: string): Promise<Tag | null>;
  public abstract findMany(): Promise<Tag[]>;
  public abstract deleteById(tagId: string): Promise<void>;
  public abstract save(tag: Tag): Promise<void>;
}
