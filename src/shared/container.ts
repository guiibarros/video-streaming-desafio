import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUsersRepository } from '@core/modules/account/repositories/IUsersRepository';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/PrismaUsesrRepository';

import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
);
