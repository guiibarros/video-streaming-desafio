import { User as RawUser } from '@prisma/client';

import { User } from '@core/modules/account/entities/User';

export class PrismaUserMapper {
  private constructor() {}

  public static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
    };
  }

  public static toDomain(user: RawUser): User {
    return new User(
      {
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
      },
      user.id,
    );
  }
}
