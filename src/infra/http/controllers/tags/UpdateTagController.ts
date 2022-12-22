import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateTagUseCase } from '@core/modules/videos/useCases/UpdateTagUseCase';

export class UpdateTagController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: tagId } = request.params;
    const { name } = request.body;

    const updateTagUseCase = container.resolve(UpdateTagUseCase);

    await updateTagUseCase.execute({
      tagId,
      name,
    });

    return response.send();
  }
}
