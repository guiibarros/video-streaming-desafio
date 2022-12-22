import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { GetAllVideosUseCase } from './';

describe('Get all videos', () => {
  it('should be able to get all videos', async () => {
    const videosRepository = new InMemoryVideosRepository();
    const getAllVideosUseCase = new GetAllVideosUseCase(videosRepository);

    await videosRepository.create(VideoFactory.make({ userId: 'user-1' }));
    await videosRepository.create(VideoFactory.make({ userId: 'user-2' }));

    const { videos } = await getAllVideosUseCase.execute();

    expect(videos).toHaveLength(2);
    expect(videos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-1' }),
        expect.objectContaining({ userId: 'user-2' }),
      ]),
    );
  });
});
