import { inject, injectable } from 'tsyringe';

import { Tag } from '../../entities/Tag';
import { ITagsRepository } from '../../repositories/ITagsRepository';

interface IGetAllTagsResponse {
  tags: Tag[];
}

@injectable()
export class GetAllTagsUseCase {
  public constructor(
    @inject('TagsRepository')
    private readonly tagsRepository: ITagsRepository,
  ) {}

  public async execute(): Promise<IGetAllTagsResponse> {
    const tags = await this.tagsRepository.findMany();

    return {
      tags,
    };
  }
}
