import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { GetUserVideosUseCase } from './';

describe('Get user videos', () => {
  it('should be able to get all user videos', async () => {
    const videosRepository = new InMemoryVideosRepository();
    const getUserVideosUseCase = new GetUserVideosUseCase(videosRepository);

    await videosRepository.create(VideoFactory.make({ userId: 'user-1' }));

    await videosRepository.create(VideoFactory.make({ userId: 'user-1' }));

    const { videos } = await getUserVideosUseCase.execute({
      userId: 'user-1',
    });

    expect(videos).toHaveLength(2);
    expect(videos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-1' }),
        expect.objectContaining({ userId: 'user-1' }),
      ]),
    );
  });
});
