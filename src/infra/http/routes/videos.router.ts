import { Router } from 'express';

import { GetAllVideosController } from '../controllers/videos/GetAllVideosController';
import { UploadVideoController } from '../controllers/videos/UploadVideoController';

const videosRouter = Router();

const getAllVideosController = new GetAllVideosController();
const uploadVideosController = new UploadVideoController();

videosRouter.post('/', uploadVideosController.handle);
videosRouter.get('/', getAllVideosController.handle);

export { videosRouter };
