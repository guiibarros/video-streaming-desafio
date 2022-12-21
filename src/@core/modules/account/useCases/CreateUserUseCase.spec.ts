import { UserFactory } from '@test/factories/UserFactory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory/InMemoryUsersRepository';

import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';
import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a user', async () => {
    const { user } = await createUserUseCase.execute({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });

  it('should not be able to create a user that already exists', async () => {
    const user = UserFactory.make();

    await usersRepository.create(user);

    await expect(
      createUserUseCase.execute({
        email: user.email,
        name: 'some-name',
        password: 'some-pass',
      }),
    ).rejects.toThrow(UserAlreadyExistsError);
  });
});
