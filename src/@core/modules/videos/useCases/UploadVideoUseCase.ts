import { IUploadVideoDTO } from '../dtos/IUploadVideoDTO';
import { Video } from '../entities/Video';
import { IVideosRepository } from '../repositories/IVideosRepository';

interface IUploadVideoResponse {
  video: Video;
}

export class UploadVideoUseCase {
  public constructor(private readonly videosRepository: IVideosRepository) {}

  public async execute(
    uploadVideoRequest: IUploadVideoDTO,
  ): Promise<IUploadVideoResponse> {
    const video = new Video(uploadVideoRequest);

    await this.videosRepository.create(video);

    return {
      video,
    };
  }
}
