import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { Tag } from '@core/modules/videos/entities/Tag';
import { Video } from '@core/modules/videos/entities/Video';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';

import { PrismaVideoMapper } from '../mappers/PrismaVideoMapper';

@injectable()
export class PrismaVideosRepository implements IVideosRepository {
  public constructor(
    @inject('PrismaClient')
    private readonly prisma: PrismaClient,
  ) {}

  public async create(video: Video): Promise<void> {
    await this.prisma.video.create({
      data: PrismaVideoMapper.toPrisma(video),
    });
  }

  public async findById(videoId: string): Promise<Video | null> {
    const raw = await this.prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaVideoMapper.toDomain(raw);
  }

  public async findManyByUserId(userId: string): Promise<Video[]> {
    const raw = await this.prisma.video.findMany({
      where: {
        userId,
      },
    });

    return raw.map(PrismaVideoMapper.toDomain);
  }

  public async findByIdAndUserId(
    videoId: string,
    userId: string,
  ): Promise<Video | null> {
    const raw = await this.prisma.video.findFirst({
      where: {
        id: videoId,
        userId,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaVideoMapper.toDomain(raw);
  }

  public async findMany(): Promise<Video[]> {
    const videos = await this.prisma.video.findMany();

    return videos.map(PrismaVideoMapper.toDomain);
  }

  public async save(video: Video): Promise<void> {
    await this.prisma.video.update({
      where: {
        id: video.id,
      },
      data: PrismaVideoMapper.toPrisma(video),
    });
  }

  public async addVideoTag(videoId: string, tagId: string): Promise<void> {
    await this.prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        tags: {
          connect: {
            id: tagId,
          },
        },
      },
    });
  }

  public async deleteById(videoId: string): Promise<void> {
    await this.prisma.video.delete({
      where: {
        id: videoId,
      },
    });
  }
}
