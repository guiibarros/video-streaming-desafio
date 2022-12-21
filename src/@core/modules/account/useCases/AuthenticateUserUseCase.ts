import { inject, injectable } from 'tsyringe';

import { IncorrectEmailOrPasswordError } from '../errors/IncorrectEmailOrPasswordError';
import { IAuthProvider } from '../providers/IAuthProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  public constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('AuthProvider')
    private readonly authProvider: IAuthProvider,
  ) {}

  public async execute(
    request: IAuthenticateUserRequest,
  ): Promise<IAuthenticateUserResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    if (user.password !== password) {
      throw new IncorrectEmailOrPasswordError();
    }

    const token = this.authProvider.login(user.id);

    return {
      token,
    };
  }
}
