import { JWTAuthProvider } from '@infra/http/providers/AuthProvider/JWTAuthProvider';
import { UserFactory } from '@test/factories/UserFactory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory/InMemoryUsersRepository';

import { IAuthProvider } from '../providers/IAuthProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: IUsersRepository;
let authProvider: IAuthProvider;
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
    ).rejects.toThrow('Email or password incorrect.');
  });

  it('should not be able to authenticate user with a incorrect password', async () => {
    const user = UserFactory.make();

    await usersRepository.create(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid-pass',
      }),
    ).rejects.toThrow('Email or password incorrect.');
  });
});
