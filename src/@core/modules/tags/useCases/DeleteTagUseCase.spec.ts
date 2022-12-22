import { TagFactory } from '@test/factories/TagFactory';
import { InMemoryTagsRepository } from '@test/repositories/in-memory/InMemoryTagsRepository';

import { DeleteTagUseCase } from './DeleteTagUseCase';

let tagsRepository: InMemoryTagsRepository;
let deleteTagUseCase: DeleteTagUseCase;

describe('Delete tag', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository();
    deleteTagUseCase = new DeleteTagUseCase(tagsRepository);
  });

  it('should be able to delete a tag', async () => {
    const targetTag = TagFactory.make({ name: 'tag-name-1' });

    await tagsRepository.create(targetTag);
    await tagsRepository.create(TagFactory.make({ name: 'tag-name-2' }));

    await deleteTagUseCase.execute({
      tagId: targetTag.id,
    });

    expect(tagsRepository.tags).toHaveLength(1);
  });
});
