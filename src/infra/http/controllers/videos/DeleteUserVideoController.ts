import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserVideoUseCase } from '@core/modules/videos/useCases/DeleteUserVideoUseCase';

export class DeleteUserVideoController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { id: videoId } = request.params;

    const deleteUserVideoUseCase = container.resolve(DeleteUserVideoUseCase);

    await deleteUserVideoUseCase.execute({
      userId,
      videoId,
    });

    return response.send();
  }
}
