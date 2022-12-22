import { User } from '@core/modules/account/entities/User';
import { IUsersRepository } from '@core/modules/account/repositories/IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  public readonly users: User[] = [];

  public async create(user: User): Promise<void> {
    this.users.push(user);
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  public async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return password === passwordHash;
  }
}
