import { IAuthProvider } from '../providers/IAuthProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  token: string;
}

export class AuthenticateUserUseCase {
  public constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly authProvider: IAuthProvider,
  ) {}

  public async execute(request: IAuthRequest): Promise<IAuthResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect.');
    }

    if (user.password !== password) {
      throw new Error('Email or password incorrect.');
    }

    const token = this.authProvider.login(user.id);

    return {
      token,
    };
  }
}
