import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadVideoUseCase } from '@core/modules/videos/useCases/UploadVideoUseCase';
import { VideoViewModel } from '@infra/http/ViewModel/VideoViewModel';

export class UploadVideoController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, videoUrl } = request.body;
    const { userId } = request.user;

    const uploadVideoUseCase = container.resolve(UploadVideoUseCase);

    const { video } = await uploadVideoUseCase.execute({
      title,
      description,
      userId,
      videoUrl,
    });

    return response.status(201).json({
      video: VideoViewModel.toHTTP(video),
    });
  }
}
