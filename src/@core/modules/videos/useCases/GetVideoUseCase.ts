import { inject, injectable } from 'tsyringe';

import { Video } from '../entities/Video';
import { VideoNotFoundError } from '../errors/VideoNotFoundError';
import { IVideosRepository } from '../repositories/IVideosRepository';

interface IGetVideoRequest {
  videoId: string;
}

interface IGetVideoResponse {
  video: Video;
}

@injectable()
export class GetVideoUseCase {
  public constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  public async execute(request: IGetVideoRequest): Promise<IGetVideoResponse> {
    const { videoId } = request;

    const video = await this.videosRepository.findById(videoId);

    if (!video) {
      throw new VideoNotFoundError();
    }

    return {
      video,
    };
  }
}
