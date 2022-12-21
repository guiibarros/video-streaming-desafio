import { Video } from '../entities/Video';
import { IVideosRepository } from '../repositories/IVideosRepository';

interface IGetUserVideosRequest {
  userId: string;
}

interface IGetUserVideosResponse {
  videos: Video[];
}

export class GetUserVideosUseCase {
  public constructor(private readonly videosRepository: IVideosRepository) {}

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
