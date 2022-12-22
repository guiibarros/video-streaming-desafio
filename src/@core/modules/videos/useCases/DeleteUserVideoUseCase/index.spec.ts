import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { VideoNotFoundError } from '../../errors/VideoNotFoundError';
import { DeleteUserVideoUseCase } from './';

let videosRepository: InMemoryVideosRepository;
let deleteUserVideoUseCase: DeleteUserVideoUseCase;

describe('Delete user video', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository();
    deleteUserVideoUseCase = new DeleteUserVideoUseCase(videosRepository);
  });

  it('should be able to delete a user video', async () => {
    const video = VideoFactory.make();

    await videosRepository.create(video);

    await deleteUserVideoUseCase.execute({
      videoId: video.id,
      userId: video.userId,
    });

    expect(videosRepository.videos).toHaveLength(0);
  });

  it('should not be able to delete a non existing user video', async () => {
    const video = VideoFactory.make();

    await videosRepository.create(video);

    await expect(
      deleteUserVideoUseCase.execute({
        videoId: 'invalid-video-id',
        userId: video.userId,
      }),
    ).rejects.toThrow(VideoNotFoundError);
  });
});
