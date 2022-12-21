import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { VideoNotFoundError } from '../errors/VideoNotFoundError';
import { UpdateUserVideoUseCase } from './UpdateUserVideoUseCase';

let videosRepository: InMemoryVideosRepository;
let updateUserVideoUseCase: UpdateUserVideoUseCase;

describe('Update user video', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository();
    updateUserVideoUseCase = new UpdateUserVideoUseCase(videosRepository);
  });

  it('should be able to update a user video', async () => {
    const video = VideoFactory.make();

    await videosRepository.create(video);

    await updateUserVideoUseCase.execute({
      videoId: video.id,
      userId: video.userId,
      title: 'changed-title',
      description: 'changed-description',
    });

    expect(videosRepository.videos[0]).toEqual(
      expect.objectContaining({
        title: 'changed-title',
        description: 'changed-description',
      }),
    );
  });

  it('should not be able to update a non existing user video', async () => {
    const video = VideoFactory.make();

    await videosRepository.create(video);

    await expect(
      updateUserVideoUseCase.execute({
        videoId: 'invalid-video-id',
        userId: video.userId,
        title: 'changed-title',
        description: 'changed-description',
      }),
    ).rejects.toThrow(VideoNotFoundError);
  });
});
