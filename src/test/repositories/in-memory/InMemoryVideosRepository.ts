import { Video } from '@core/modules/videos/entities/Video';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';

import { InMemoryTagsRepository } from './InMemoryTagsRepository';

interface IVideosTags {
  videoId: string;
  tagId: string;
}

export class InMemoryVideosRepository implements IVideosRepository {
  public readonly videos: Video[] = [];
  public readonly videosTags: IVideosTags[] = [];

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

  public async addVideoTag(videoId: string, tagId: string): Promise<void> {
    this.videosTags.push({
      videoId,
      tagId,
    });
  }

  public async findManyByTagName(tagName: string): Promise<any[]> {
    const tagsRepository = InMemoryTagsRepository.getInstance();

    const tag = await tagsRepository.findByName(tagName);

    const videosTagsMatches = this.videosTags.filter(
      (videoTag) => videoTag.tagId === tag?.id,
    );

    let filteredVideos: Video[] = [];

    videosTagsMatches.forEach((videoTag) => {
      filteredVideos = this.videos.filter(
        (video) => video.id === videoTag.videoId,
      );
    });

    return filteredVideos.map((video) => {
      return {
        ...video,
        tag,
      };
    });
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
