import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@core/modules/account/entities/User';
import { IUsersRepository } from '@core/modules/account/repositories/IUsersRepository';

import { PrismaUserMapper } from '../mappers/PrismaUserMapper';

@injectable()
export class PrismaUsersRepository implements IUsersRepository {
  public constructor(
    @inject('PrismaClient')
    private readonly prisma: PrismaClient,
  ) {}

  public async create(user: User): Promise<void> {
    const raw = await PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: raw,
    });
  }

  public async findById(userId: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
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
    const raw = await this.prisma.user.findFirst({
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
