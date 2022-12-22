import { inject, injectable } from 'tsyringe';

import { TagNotFoundError } from '../../errors/TagNotFoundError';
import { ITagsRepository } from '../../repositories/ITagsRepository';

interface IDeleteTagRequest {
  tagId: string;
}

@injectable()
export class DeleteTagUseCase {
  public constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(request: IDeleteTagRequest): Promise<void> {
    const { tagId } = request;

    const tag = await this.tagsRepository.findById(tagId);

    if (!tag) {
      throw new TagNotFoundError();
    }

    await this.tagsRepository.deleteById(tag.id);
  }
}
