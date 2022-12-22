import '@shared/container';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import swagger from 'swagger-ui-express';

import { BaseError } from '@core/errors/BaseError';

import swaggerJson from '../../swagger.json';
import { router } from './routes';

const app = express();

app.use('/api-docs', swagger.serve, swagger.setup(swaggerJson));
app.use(express.json());
app.use(router);

// Error handler
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof BaseError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 500,
      message: `Internal server error: ${error.message}`,
    });
  },
);

export { app };
