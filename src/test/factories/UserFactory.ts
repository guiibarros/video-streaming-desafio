import { IUserProps, User } from '@core/modules/account/entities/User';

export class UserFactory {
  private constructor() {}

  public static make(override: Partial<IUserProps> = {}): User {
    return new User({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      ...override,
    });
  }
}
