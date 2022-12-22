import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@core/config/auth';
import { BaseError } from '@core/errors/BaseError';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/PrismaUsesrRepository';

import { TokenMustBeProvidedError } from '../errors/TokenMustBeProvidedError';

interface IVerifyPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  const { secret } = auth;

  if (!authHeader) {
    throw new TokenMustBeProvidedError();
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, secret) as IVerifyPayload;

    const usersRepository = new PrismaUsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new Error('User does not exists.');
    }

    request.user = {
      userId,
    };

    return next();
  } catch (error: any) {
    throw new BaseError(error.message, 401);
  }
}
