import { User } from '@core/modules/account/entities/User';

type IUserToHTTP = Omit<User, 'password'>;

export class UserViewModel {
  private constructor() {}

  public static toHTTP(user: User): IUserToHTTP {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
