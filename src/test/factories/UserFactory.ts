import { User } from '@modules/account/entities/User';

export class UserFactory {
  private constructor() {}

  public static make(override: Partial<User> = {}): User {
    return new User({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      ...override,
    });
  }
}
