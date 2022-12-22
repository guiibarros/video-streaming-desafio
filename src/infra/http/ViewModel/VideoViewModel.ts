import { Video } from '@core/modules/videos/entities/Video';

interface IVideoToHTTP {
  id: string;
  title: string;
  userId: string;
  description: string;
  videoUrl: string;
  createdAt: Date;
}

export class VideoViewModel {
  private constructor() {}

  public static toHTTP(video: Video): IVideoToHTTP {
    return {
      id: video.id,
      title: video.title,
      userId: video.userId,
      description: video.description,
      videoUrl: video.videoUrl,
      createdAt: video.createdAt,
    };
  }
}
