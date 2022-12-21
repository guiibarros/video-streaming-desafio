import { VideoFactory } from '@test/factories/VideoFactory';
import { InMemoryVideosRepository } from '@test/repositories/in-memory/InMemoryVideosRepository';

import { VideoNotFoundError } from '../errors/VideoNotFoundError';
import { GetVideoUseCase } from './GetVideoUseCase';

let videosRepository: InMemoryVideosRepository;
let getVideoUseCase: GetVideoUseCase;

describe('Get video', () => {
  beforeEach(() => {
    videosRepository = new InMemoryVideosRepository();
    getVideoUseCase = new GetVideoUseCase(videosRepository);
  });

  it('should be able to get a video', async () => {
    const video = VideoFactory.make();

    await videosRepository.create(video);

    const { video: videoFetched } = await getVideoUseCase.execute({
      videoId: video.id,
    });

    expect(videoFetched).toEqual(video);
  });

  it('should not be able to get a non existing video', async () => {
    await expect(
      getVideoUseCase.execute({
        videoId: 'invalid-video-id',
      }),
    ).rejects.toThrow(VideoNotFoundError);
  });
});
