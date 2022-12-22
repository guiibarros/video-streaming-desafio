import { inject, injectable } from 'tsyringe';

import { Video } from '../../entities/Video';
import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IGetTagVideosRequest {
  tagName: string;
}

interface IGetTagVideosResponse {
  videos: Video[];
}

@injectable()
export class GetTagVideosUseCase {
  public constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  public async execute(
    request: IGetTagVideosRequest,
  ): Promise<IGetTagVideosResponse> {
    const { tagName } = request;

    const videos = await this.videosRepository.findManyByTagName(tagName);

    return {
      videos,
    };
  }
}
