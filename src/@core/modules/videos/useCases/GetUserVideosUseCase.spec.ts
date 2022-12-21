import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { GetUserVideosUseCase } from './GetUserVideosUseCase';

describe('Get user videos', () => {
  it('should be able to get all user videos', async () => {
    const videosRepository = new InMemoryVideosRepository();
    const getUserVideosUseCase = new GetUserVideosUseCase(videosRepository);

    const video = VideoFactory.make({ userId: 'some-user-id' });

    await videosRepository.create(video);
    await videosRepository.create(video);

    const { videos } = await getUserVideosUseCase.execute({
      userId: video.userId,
    });

    expect(videos).toHaveLength(2);
    expect(videos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'some-user-id' }),
        expect.objectContaining({ userId: 'some-user-id' }),
      ]),
    );
  });
});
