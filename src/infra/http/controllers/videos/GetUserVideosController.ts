import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserVideosUseCase } from '@core/modules/videos/useCases/GetUserVideosUseCase';
import { VideoViewModel } from '@infra/http/ViewModel/VideoViewModel';

export class GetUserVideosController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.params;
    const getUserVideosUseCase = container.resolve(GetUserVideosUseCase);

    const { videos } = await getUserVideosUseCase.execute({
      userId,
    });

    return response.json({
      videos: videos.map(VideoViewModel.toHTTP),
    });
  }
}
