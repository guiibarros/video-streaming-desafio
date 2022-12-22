import { TagFactory } from '@test/factories/TagFactory';
import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryTagsRepository } from '@test/repositories/in-memory/InMemoryTagsRepository';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { AddTagUseCase } from '.';

let videosRepository: InMemoryVideosRepository;
let tagsRepository: InMemoryTagsRepository;
let addTagUseCase: AddTagUseCase;

describe('Add tag', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository();
    tagsRepository = new InMemoryTagsRepository();

    addTagUseCase = new AddTagUseCase(videosRepository, tagsRepository);
  });

  it('should be able to assign a tag to a video', async () => {
    const video = VideoFactory.make({ userId: 'user-1' });
    const tag = TagFactory.make({ name: 'name-test' });

    await videosRepository.create(video);
    await tagsRepository.create(tag);

    await addTagUseCase.execute({
      tagId: tag.id,
      userId: video.userId,
      videoId: video.id,
    });

    expect(videosRepository.videosTags).toHaveLength(1);
    expect(videosRepository.videosTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          videoId: video.id,
          tagId: tag.id,
        }),
      ]),
    );
  });
});
