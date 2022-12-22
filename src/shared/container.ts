import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import { IUsersRepository } from '@core/modules/account/repositories/IUsersRepository';
import { ITagsRepository } from '@core/modules/videos/repositories/ITagsRepository';
import { IVideosRepository } from '@core/modules/videos/repositories/IVideosRepository';
import { PrismaTagsRepository } from '@infra/database/prisma/repositories/PrismaTagsRepository';
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

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  PrismaTagsRepository,
);

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});
