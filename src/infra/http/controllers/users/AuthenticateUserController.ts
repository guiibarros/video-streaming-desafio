import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '@core/modules/account/useCases/AuthenticateUserUseCase';

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { token, user } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}
