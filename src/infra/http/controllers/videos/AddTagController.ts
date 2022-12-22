import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddTagUseCase } from '@core/modules/videos/useCases/AddTagUseCase';

export class AddTagController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { id: videoId } = request.params;
    const { tagId } = request.body;

    const addTagUseCase = container.resolve(AddTagUseCase);

    await addTagUseCase.execute({
      userId,
      videoId,
      tagId,
    });

    return response.status(201).send();
  }
}
