import { Router } from 'express';

import { sessionsRouter } from './sessions.router';
import { usersRouter } from './users.router';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export { router };
