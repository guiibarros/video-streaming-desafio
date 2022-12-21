import { Router } from 'express';

import { sessionsRouter } from './sessions.router';
import { usersRouter } from './users.router';
import { videosRouter } from './videos.router';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/videos', videosRouter);

export { router };
