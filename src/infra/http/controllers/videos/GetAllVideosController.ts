import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllVideosUseCase } from '@core/modules/videos/useCases/GetAllVideosUseCase';

export class GetAllVideosController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getAllVideosUseCase = container.resolve(GetAllVideosUseCase);

    const { videos } = await getAllVideosUseCase.execute();

    return response.json({
      videos,
    });
  }
}
