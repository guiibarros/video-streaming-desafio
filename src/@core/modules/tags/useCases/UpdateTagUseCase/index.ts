import { inject, injectable } from 'tsyringe';

import { TagNotFoundError } from '../../errors/TagNotFoundError';
import { ITagsRepository } from '../../repositories/ITagsRepository';

interface IUpdateTagRequest {
  tagId: string;
  name?: string;
}

@injectable()
export class UpdateTagUseCase {
  public constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(request: IUpdateTagRequest): Promise<void> {
    const { tagId, name } = request;

    const tag = await this.tagsRepository.findById(tagId);

    if (!tag) {
      throw new TagNotFoundError();
    }

    tag.name = name ?? tag.name;

    await this.tagsRepository.save(tag);
  }
}
