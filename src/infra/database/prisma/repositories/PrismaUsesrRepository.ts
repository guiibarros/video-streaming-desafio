import { compare } from 'bcrypt';

import { User } from '@core/modules/account/entities/User';
import { IUsersRepository } from '@core/modules/account/repositories/IUsersRepository';

import { prisma } from '../index';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';

export class PrismaUsersRepository implements IUsersRepository {
  public async create(user: User): Promise<void> {
    const raw = await PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data: raw,
    });
  }

  public async findById(userId: string): Promise<User | null> {
    const raw = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaUserMapper.toDomain(raw);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const raw = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaUserMapper.toDomain(raw);
  }

  public async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await compare(password, passwordHash);
  }
}
