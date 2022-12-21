import { Video } from '@core/modules/videos/entities/Video';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';

export class InMemoryVideosRepository implements IVideosRepository {
  public readonly videos: Video[] = [];

  public async create(video: Video): Promise<void> {
    this.videos.push(video);
  }

  public async findManyByUserId(userId: string): Promise<Video[]> {
    const videos = this.videos.filter((video) => video.userId === userId);

    return videos;
  }
}
