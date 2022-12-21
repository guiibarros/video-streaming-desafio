import { Router } from 'express';

import { GetAllVideosController } from '../controllers/videos/GetAllVideosController';

const videosRouter = Router();

const getAllVideosController = new GetAllVideosController();

videosRouter.get('/', getAllVideosController.handle);

export { videosRouter };
