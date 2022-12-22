import { Tag } from '../entities/Tag';

export abstract class ITagsRepository {
  public abstract create(tag: Tag): Promise<void>;
  public abstract findByName(name: string): Promise<Tag | null>;
  public abstract findMany(): Promise<Tag[]>;
}
