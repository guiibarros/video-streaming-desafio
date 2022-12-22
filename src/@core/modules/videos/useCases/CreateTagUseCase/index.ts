import { inject, injectable } from 'tsyringe';

import { Tag } from '../../entities/Tag';
import { TagAlreadyExistsError } from '../../errors/TagAlreadyExistsError';
import { ITagsRepository } from '../../repositories/ITagsRepository';

interface ICreateTagRequest {
  name: string;
}

interface ICreateTagResponse {
  tag: Tag;
}

@injectable()
export class CreateTagUseCase {
  public constructor(
    @inject('TagsRepository')
    private readonly tagsRepository: ITagsRepository,
  ) {}

  public async execute(
    request: ICreateTagRequest,
  ): Promise<ICreateTagResponse> {
    const { name } = request;

    const tagAlreadyExists = await this.tagsRepository.findByName(name);

    if (tagAlreadyExists) {
      throw new TagAlreadyExistsError();
    }

    const tag = new Tag({
      name,
    });

    await this.tagsRepository.create(tag);

    return {
      tag,
    };
  }
}
