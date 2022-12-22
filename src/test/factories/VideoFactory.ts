import { IVideoProps, Video } from '@core/modules/videos/entities/Video';

export class VideoFactory {
  private constructor() {}

  public static make(override: Partial<IVideoProps> = {}): Video {
    return new Video({
      title: 'test',
      description: 'test',
      userId: 'test',
      videoUrl: 'http://test.com/test.mp4',
      ...override,
    });
  }
}
