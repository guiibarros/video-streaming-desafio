import { inject, injectable } from 'tsyringe';

import { IncorrectEmailOrPasswordError } from '../../errors/IncorrectEmailOrPasswordError';
import { IAuthProvider } from '../../providers/IAuthProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
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

    const isPasswordMatch = await this.usersRepository.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const token = this.authProvider.login(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
