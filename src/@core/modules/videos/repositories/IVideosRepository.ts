import { Tag } from '../entities/Tag';
import { Video } from '../entities/Video';

export abstract class IVideosRepository {
  public abstract create(video: Video): Promise<void>;
  public abstract findById(videoId: string): Promise<Video | null>;
  public abstract findManyByUserId(userId: string): Promise<Video[]>;
  public abstract findByIdAndUserId(
    videoId: string,
    userId: string,
  ): Promise<Video | null>;
  public abstract findMany(): Promise<Video[]>;
  public abstract save(video: Video): Promise<void>;
  public abstract addVideoTag(videoId: string, tagId: string): Promise<void>;
  public abstract deleteById(videoId: string): Promise<void>;
}
