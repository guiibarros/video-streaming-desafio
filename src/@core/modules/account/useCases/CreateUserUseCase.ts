import { inject, injectable } from 'tsyringe';

import { User } from '../entities/User';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface ICreateUserResponse {
  user: User;
}

@injectable()
export class CreateUserUseCase {
  public constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute(
    request: ICreateUserRequest,
  ): Promise<ICreateUserResponse> {
    const { email, name, password } = request;

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = new User({
      email,
      name,
      password,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
