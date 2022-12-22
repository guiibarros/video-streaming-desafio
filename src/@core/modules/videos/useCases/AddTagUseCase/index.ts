import { inject, injectable } from 'tsyringe';

import { TagNotFoundError } from '@core/modules/videos/errors/TagNotFoundError';
import { ITagsRepository } from '@core/modules/videos/repositories/ITagsRepository';

import { VideoNotFoundError } from '../../errors/VideoNotFoundError';
import { IVideosRepository } from '../../repositories/IVideosRepository';

interface IAddTagRequest {
  videoId: string;
  userId: string;
  tagId: string;
}

type IAddTagResponse = void;

@injectable()
export class AddTagUseCase {
  public constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(request: IAddTagRequest): Promise<IAddTagResponse> {
    const { tagId, userId, videoId } = request;

    const video = await this.videosRepository.findByIdAndUserId(
      videoId,
      userId,
    );

    if (!video) {
      throw new VideoNotFoundError();
    }

    const tag = await this.tagsRepository.findById(tagId);

    if (!tag) {
      throw new TagNotFoundError();
    }
  }
}
