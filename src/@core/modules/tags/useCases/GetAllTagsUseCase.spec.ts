import { TagFactory } from '@test/factories/TagFactory';
import { InMemoryTagsRepository } from '@test/repositories/in-memory/InMemoryTagsRepository';

import { GetAllTagsUseCase } from './GetAllTagsUseCase';

let tagsRepository: InMemoryTagsRepository;
let getAllTagsUseCase: GetAllTagsUseCase;

describe('Get all tags', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository();
    getAllTagsUseCase = new GetAllTagsUseCase(tagsRepository);
  });

  it('should be able to get all tags', async () => {
    await tagsRepository.create(TagFactory.make({ name: 'tag-name-1' }));
    await tagsRepository.create(TagFactory.make({ name: 'tag-name-2' }));

    const { tags } = await getAllTagsUseCase.execute();

    expect(tags).toHaveLength(2);
    expect(tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'tag-name-1' }),
        expect.objectContaining({ name: 'tag-name-2' }),
      ]),
    );
  });
});
