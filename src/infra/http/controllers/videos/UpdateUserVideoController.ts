import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserVideoUseCase } from '@core/modules/videos/useCases/UpdateUserVideoUseCase';

export class UpdateUserVideoController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { id: videoId } = request.params;

    const { title, description } = request.body;

    const updateUserVideoUseCase = container.resolve(UpdateUserVideoUseCase);

    await updateUserVideoUseCase.execute({
      userId,
      videoId,
      title,
      description,
    });

    return response.send();
  }
}
