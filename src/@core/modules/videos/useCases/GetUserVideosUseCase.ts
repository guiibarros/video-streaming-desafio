import { inject, injectable } from 'tsyringe';

import { Video } from '../entities/Video';
import { IVideosRepository } from '../repositories/IVideosRepository';

interface IGetUserVideosRequest {
  userId: string;
}

interface IGetUserVideosResponse {
  videos: Video[];
}

@injectable()
export class GetUserVideosUseCase {
  public constructor(
    @inject('VideosRepository')
    private readonly videosRepository: IVideosRepository,
  ) {}

  public async execute(
    request: IGetUserVideosRequest,
  ): Promise<IGetUserVideosResponse> {
    const { userId } = request;

    const videos = await this.videosRepository.findManyByUserId(userId);

    return {
      videos,
    };
  }
}
