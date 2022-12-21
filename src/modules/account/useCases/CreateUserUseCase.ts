import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface ICreateUserResponse {
  user: User;
}

export class CreateUserUseCase {
  public constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute(
    createUserDTO: ICreateUserDTO,
  ): Promise<ICreateUserResponse> {
    const user = new User(createUserDTO);

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
