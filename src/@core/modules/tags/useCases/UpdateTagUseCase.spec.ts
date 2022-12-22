import { TagFactory } from '@test/factories/TagFactory';
import { InMemoryTagsRepository } from '@test/repositories/in-memory/InMemoryTagsRepository';

import { UpdateTagUseCase } from './UpdateTagUseCase';

let tagsRepository: InMemoryTagsRepository;
let updateTagUseCase: UpdateTagUseCase;

describe('Update tag', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository();
    updateTagUseCase = new UpdateTagUseCase(tagsRepository);
  });

  it('should be able to delete a tag', async () => {
    const targetTag = TagFactory.make({ name: 'tag-name-original' });

    await tagsRepository.create(targetTag);
    await tagsRepository.create(TagFactory.make({ name: 'tag-name-2' }));

    await updateTagUseCase.execute({
      tagId: targetTag.id,
      name: 'tag-name-new',
    });

    expect(tagsRepository.tags[0]).toEqual(
      expect.objectContaining({ name: 'tag-name-new' }),
    );
  });
});
