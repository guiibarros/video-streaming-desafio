import { inject, injectable } from 'tsyringe';

import { VideoNotFoundError } from '../../errors/VideoNotFoundError';
import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IDeleteUserVideoRequest {
  videoId: string;
  userId: string;
}

type IDeleteUserVideoResponse = void;

@injectable()
export class DeleteUserVideoUseCase {
  public constructor(
    @inject('VideosRepository')
    private readonly videosRepository: IVideosRepository,
  ) {}

  public async execute(
    request: IDeleteUserVideoRequest,
  ): Promise<IDeleteUserVideoResponse> {
    const { userId, videoId } = request;

    const video = await this.videosRepository.findByIdAndUserId(
      videoId,
      userId,
    );

    if (!video) {
      throw new VideoNotFoundError();
    }

    await this.videosRepository.deleteById(video.id);
  }
}
