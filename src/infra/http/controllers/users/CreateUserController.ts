import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@core/modules/account/useCases/CreateUserUseCase';
import { UserViewModel } from '@infra/http/ViewModel/UserViewModel';

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password } = request.body;

    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).json({
      user: UserViewModel.toHTTP(user),
    });
  }
}
