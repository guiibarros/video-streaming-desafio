import { inject, injectable } from 'tsyringe';

import { Video } from '../../entities/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IUploadVideoRequest {
  title: string;
  description: string;
  userId: string;
  videoUrl: string;
}

interface IUploadVideoResponse {
  video: Video;
}

@injectable()
export class UploadVideoUseCase {
  public constructor(
    @inject('VideosRepository')
    private readonly videosRepository: IVideosRepository,
  ) {}

  public async execute(
    request: IUploadVideoRequest,
  ): Promise<IUploadVideoResponse> {
    const { title, description, userId, videoUrl } = request;

    const video = new Video({
      title,
      description,
      userId,
      videoUrl,
    });

    await this.videosRepository.create(video);

    return {
      video,
    };
  }
}
