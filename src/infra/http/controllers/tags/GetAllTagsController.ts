import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllTagsUseCase } from '@core/modules/tags/useCases/GetAllTagsUseCase';
import { TagViewModel } from '@infra/http/ViewModel/TagViewModel';

export class GetAllTagsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getAllTagsUseCase = container.resolve(GetAllTagsUseCase);

    const { tags } = await getAllTagsUseCase.execute();

    return response.json({
      tags: tags.map(TagViewModel.toHTTP),
    });
  }
}
