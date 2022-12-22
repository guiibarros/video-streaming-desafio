import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { Tag } from '@core/modules/tags/entities/Tag';
import { ITagsRepository } from '@core/modules/tags/repositories/ITagsRepository';

import { PrismaTagMapper } from '../mappers/PrismaTagMapper';

@injectable()
export class PrismaTagsRepository implements ITagsRepository {
  public constructor(
    @inject('PrismaClient')
    private readonly prisma: PrismaClient,
  ) {}

  public async create(tag: Tag): Promise<void> {
    const raw = await PrismaTagMapper.toPrisma(tag);

    await this.prisma.tag.create({
      data: raw,
    });
  }

  public async findById(tagId: string): Promise<Tag | null> {
    const raw = await this.prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaTagMapper.toDomain(raw);
  }

  public async findByName(name: string): Promise<Tag | null> {
    const raw = await this.prisma.tag.findFirst({
      where: {
        name,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaTagMapper.toDomain(raw);
  }

  public async findMany(): Promise<Tag[]> {
    const raw = await this.prisma.tag.findMany();

    return raw.map(PrismaTagMapper.toDomain);
  }

  public async save(tag: Tag): Promise<void> {
    console.log(tag);

    await this.prisma.tag.update({
      where: {
        id: tag.id,
      },
      data: PrismaTagMapper.toPrisma(tag),
    });
  }

  public async deleteById(tagId: string): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        id: tagId,
      },
    });
  }
}
