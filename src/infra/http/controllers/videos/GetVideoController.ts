import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetVideoUseCase } from '@core/modules/videos/useCases/GetVideoUseCase';
import { VideoViewModel } from '@infra/http/ViewModel/VideoViewModel';

export class GetVideoController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: videoId } = request.params;

    const getVideoUseCase = container.resolve(GetVideoUseCase);

    const { video } = await getVideoUseCase.execute({ videoId });

    return response.json({
      video: VideoViewModel.toHTTP(video),
    });
  }
}
