import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { sessionsRouter } from './sessions.router';
import { tagsRouter } from './tags.router';
import { usersRouter } from './users.router';
import { videosRouter } from './videos.router';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

router.use(ensureAuthenticated);
router.use('/videos', videosRouter);

router.use('/tags', tagsRouter);

export { router };
