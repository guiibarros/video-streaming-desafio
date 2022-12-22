import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteTagUseCase } from '@core/modules/tags/useCases/DeleteTagUseCase';

export class DeleteTagController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: tagId } = request.params;

    const deleteTagUseCase = container.resolve(DeleteTagUseCase);

    await deleteTagUseCase.execute({
      tagId,
    });

    return response.send();
  }
}
