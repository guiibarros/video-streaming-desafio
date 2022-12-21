import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface ICreateUserResponse {
  user: User;
}

export class CreateUserUseCase {
  public constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(
    createUser: ICreateUserDTO,
  ): Promise<ICreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      createUser.email,
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = new User(createUser);

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
