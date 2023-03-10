import { JWTAuthProvider } from '@shared/providers/AuthProvider/JWTAuthProvider';
import { UserFactory } from '@test/factories/UserFactory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory/InMemoryUsersRepository';

import { IncorrectEmailOrPasswordError } from '../../errors/IncorrectEmailOrPasswordError';
import { AuthenticateUserUseCase } from './';

let usersRepository: InMemoryUsersRepository;
let authProvider: JWTAuthProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authProvider = new JWTAuthProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      authProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = UserFactory.make();
    await usersRepository.create(user);

    const { token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toBeTruthy();
  });

  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid-email',
        password: 'invalid-pass',
      }),
    ).rejects.toThrow(IncorrectEmailOrPasswordError);
  });

  it('should not be able to authenticate user with a incorrect password', async () => {
    const user = UserFactory.make();

    await usersRepository.create(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid-pass',
      }),
    ).rejects.toThrow(IncorrectEmailOrPasswordError);
  });
});
