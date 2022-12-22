import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTagUseCase } from '@core/modules/tags/useCases/CreateTagUseCase';
import { TagViewModel } from '@infra/http/ViewModel/TagViewModel';

export class CreateTagController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createTagUseCase = container.resolve(CreateTagUseCase);

    const { tag } = await createTagUseCase.execute({
      name,
    });

    return response.status(201).json({
      tag: TagViewModel.toHTTP(tag),
    });
  }
}
