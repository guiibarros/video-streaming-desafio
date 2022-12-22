import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { UploadVideoUseCase } from './';

describe('Upload video', () => {
  it('should be able to upload video', async () => {
    const videosRepository = new InMemoryVideosRepository();
    const uploadVideoUseCase = new UploadVideoUseCase(videosRepository);

    const { video } = await uploadVideoUseCase.execute({
      title: 'test',
      description: 'test',
      userId: 'test',
    });

    expect(videosRepository.videos).toHaveLength(1);
    expect(videosRepository.videos[0]).toBe(video);
  });
});
