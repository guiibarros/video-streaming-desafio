import { TagFactory } from '@test/factories/TagFactory';
import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryTagsRepository } from '@test/repositories/in-memory/InMemoryTagsRepository';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { GetTagVideosUseCase } from '.';

let tagsRepository: InMemoryTagsRepository;
let videosRepository: InMemoryVideosRepository;
let getTagVideosUseCase: GetTagVideosUseCase;

describe('Get tag videos', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository();
    tagsRepository = InMemoryTagsRepository.getInstance();

    getTagVideosUseCase = new GetTagVideosUseCase(videosRepository);
  });

  it('should be able to get tagged videos', async () => {
    const video = VideoFactory.make({ title: 'gaming-video-test' });
    const tag = TagFactory.make({ name: 'gaming' });

    await videosRepository.create(video);
    await tagsRepository.create(tag);

    await videosRepository.addVideoTag(video.id, tag.id);

    const { videos } = await getTagVideosUseCase.execute({
      tagName: 'gaming',
    });

    expect(videos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: video.id,
          tag: expect.objectContaining({ _id: tag.id }),
        }),
      ]),
    );
  });
});
