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

export class AuthenticateUserUseCase {
  public constructor(
    private readonly usersRepository: IUsersRepository,
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
