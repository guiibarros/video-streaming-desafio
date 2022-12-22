import { TagFactory } from '@test/factories/TagFactory';
import { InMemoryTagsRepository } from '@test/repositories/in-memory/InMemoryTagsRepository';

import { TagAlreadyExistsError } from '../errors/TagAlreadyExistsError';
import { CreateTagUseCase } from './CreateTagUseCase';

let tagsRepository: InMemoryTagsRepository;
let createTagUseCase: CreateTagUseCase;

describe('Create tag', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository();
    createTagUseCase = new CreateTagUseCase(tagsRepository);
  });

  it('should be able to create tag', async () => {
    const { tag } = await createTagUseCase.execute({
      name: 'tag-test',
    });

    expect(tag).toBeTruthy();
    expect(tagsRepository.tags).toHaveLength(1);
  });

  it('should not be able to create a already existing tag', async () => {
    await tagsRepository.create(TagFactory.make({ name: 'name-test' }));

    await expect(
      createTagUseCase.execute({
        name: 'name-test',
      }),
    ).rejects.toThrow(TagAlreadyExistsError);
  });
});
