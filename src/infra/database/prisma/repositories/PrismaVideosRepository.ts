import { Video } from '@core/modules/videos/entities/Video';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';

import { prisma } from '../index';
import { PrismaVideoMapper } from '../mappers/PrismaVideoMapper';

export class PrismaVideosRepository implements IVideosRepository {
  public async create(video: Video): Promise<void> {
    await prisma.video.create({
      data: PrismaVideoMapper.toPrisma(video),
    });
  }

  public async findById(videoId: string): Promise<Video | null> {
    const raw = await prisma.video.findUnique({
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
    const raw = await prisma.video.findMany({
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
    const raw = await prisma.video.findFirst({
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
    const videos = await prisma.video.findMany();

    return videos.map(PrismaVideoMapper.toDomain);
  }

  public async save(video: Video): Promise<void> {
    await prisma.video.update({
      where: {
        id: video.id,
      },
      data: PrismaVideoMapper.toPrisma(video),
    });
  }

  public async deleteById(videoId: string): Promise<void> {
    await prisma.video.delete({
      where: {
        id: videoId,
      },
    });
  }
}
