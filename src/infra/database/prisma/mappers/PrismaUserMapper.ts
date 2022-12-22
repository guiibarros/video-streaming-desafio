import { User as RawUser } from '@prisma/client';
import { hash } from 'bcrypt';

import { User } from '@core/modules/account/entities/User';

export class PrismaUserMapper {
  private constructor() {}

  public static async toPrisma(user: User): Promise<RawUser> {
    const passwordHash = await hash(user.password, 8);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: passwordHash,
      createdAt: user.createdAt,
    };
  }

  public static toDomain(user: RawUser) {
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
