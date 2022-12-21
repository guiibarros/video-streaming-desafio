import { Video } from '@core/modules/videos/entities/Video';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';

export class InMemoryVideosRepository implements IVideosRepository {
  public readonly videos: Video[] = [];

  public async create(video: Video): Promise<void> {
    this.videos.push(video);
  }

  public async findById(videoId: string): Promise<Video | null> {
    const video = this.videos.find((video) => video.id === videoId);

    if (!video) {
      return null;
    }

    return video;
  }

  public async findManyByUserId(userId: string): Promise<Video[]> {
    const videos = this.videos.filter((video) => video.userId === userId);

    return videos;
  }

  public async findByIdAndUserId(
    videoId: string,
    userId: string,
  ): Promise<Video | null> {
    const video = this.videos.find(
      (video) => video.id === videoId && video.userId === userId,
    );

    if (!video) {
      return null;
    }

    return video;
  }

  public async findMany(): Promise<Video[]> {
    return this.videos;
  }

  public async save(video: Video): Promise<void> {
    const videoIndex = this.videos.findIndex(
      (videoItem) => videoItem.id === video.id,
    );

    if (videoIndex >= 0) {
      this.videos[videoIndex] = video;
    }
  }

  public async deleteById(videoId: string): Promise<void> {
    const videoIndex = this.videos.findIndex((video) => video.id === videoId);

    this.videos.splice(videoIndex, 1);
  }
}
