import { Video } from '../entities/Video';
import { IVideosRepository } from '../repositories/IVideosRepository';

interface IGetAllVideosResponse {
  videos: Video[];
}

export class GetAllVideosUseCase {
  public constructor(private readonly videosRepository: IVideosRepository) {}

  public async execute(): Promise<IGetAllVideosResponse> {
    const videos = await this.videosRepository.findMany();

    return {
      videos,
    };
  }
}
