import { Video as RawVideo } from '@prisma/client';

import { Video } from '@core/modules/videos/entities/Video';

export class PrismaVideoMapper {
  private constructor() {}

  public static toPrisma(video: Video): RawVideo {
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      userId: video.userId,
      videoUrl: video.videoUrl,
      createdAt: video.createdAt,
    };
  }

  public static toDomain(video: RawVideo): Video {
    return new Video(
      {
        title: video.title,
        description: video.description,
        userId: video.userId,
        videoUrl: video.videoUrl,
        createdAt: video.createdAt,
      },
      video.id,
    );
  }
}
