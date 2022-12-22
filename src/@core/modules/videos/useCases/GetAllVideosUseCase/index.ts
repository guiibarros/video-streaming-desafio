import { inject, injectable } from 'tsyringe';

import { Video } from '../../entities/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IGetAllVideosResponse {
  videos: Video[];
}

@injectable()
export class GetAllVideosUseCase {
  public constructor(
    @inject('VideosRepository')
    private readonly videosRepository: IVideosRepository,
  ) {}

  public async execute(): Promise<IGetAllVideosResponse> {
    const videos = await this.videosRepository.findMany();

    return {
      videos,
    };
  }
}
