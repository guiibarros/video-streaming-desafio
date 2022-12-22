import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import { IUsersRepository } from '@core/modules/account/repositories/IUsersRepository';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/PrismaUsesrRepository';
import { PrismaVideosRepository } from '@infra/database/prisma/repositories/PrismaVideosRepository';

import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
);

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  PrismaVideosRepository,
);

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});
