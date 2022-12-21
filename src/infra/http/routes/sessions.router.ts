import { Router } from 'express';

import { AuthenticateUserController } from '../controllers/users/AuthenticateUserController';

const sessionsRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRouter.post('/', authenticateUserController.handle);

export { sessionsRouter };
