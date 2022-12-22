import { inject, injectable } from 'tsyringe';

import { VideoNotFoundError } from '../errors/VideoNotFoundError';
import { IVideosRepository } from '../repositories/IVideosRepository';

interface IUpdateUserVideoRequest {
  videoId: string;
  userId: string;
  title?: string;
  description?: string;
}

type IUpdateUserVideoResponse = void;

@injectable()
export class UpdateUserVideoUseCase {
  public constructor(
    @inject('VideosRepository')
    private readonly videosRepository: IVideosRepository,
  ) {}

  public async execute(
    request: IUpdateUserVideoRequest,
  ): Promise<IUpdateUserVideoResponse> {
    const { userId, videoId, title, description } = request;

    const video = await this.videosRepository.findByIdAndUserId(
      videoId,
      userId,
    );

    if (!video) {
      throw new VideoNotFoundError();
    }

    video.title = title ?? video.title;
    video.description = description ?? video.description;

    await this.videosRepository.save(video);
  }
}
