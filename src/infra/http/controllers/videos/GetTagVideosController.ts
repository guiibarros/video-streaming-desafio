import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetTagVideosUseCase } from '@core/modules/videos/useCases/GetTagVideosUseCase';
import { VideoViewModel } from '@infra/http/ViewModel/VideoViewModel';

export class GetTagVideosController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name: tagName } = request.params;

    const getTagVideosUseCase = container.resolve(GetTagVideosUseCase);

    const { videos } = await getTagVideosUseCase.execute({
      tagName,
    });

    return response.json({
      videos: videos.map(VideoViewModel.toHTTP),
    });
  }
}
