import { Video } from '../entities/Video';

export abstract class IVideosRepository {
  public abstract create(video: Video): Promise<void>;
  public abstract findManyByUserId(userId: string): Promise<Video[]>;
}
