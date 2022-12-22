import { Router } from 'express';

import { DeleteUserVideoController } from '../controllers/videos/DeleteUserVideoController';
import { GetAllVideosController } from '../controllers/videos/GetAllVideosController';
import { GetUserVideosController } from '../controllers/videos/GetUserVideosController';
import { GetVideoController } from '../controllers/videos/GetVideoController';
import { UpdateUserVideoController } from '../controllers/videos/UpdateUserVideoController';
import { UploadVideoController } from '../controllers/videos/UploadVideoController';

const videosRouter = Router();

const getAllVideosController = new GetAllVideosController();
const uploadVideosController = new UploadVideoController();
const getUserVideosController = new GetUserVideosController();
const getVideoController = new GetVideoController();
const deleteUserVideoController = new DeleteUserVideoController();
const updateUserVideoController = new UpdateUserVideoController();

videosRouter.post('/', uploadVideosController.handle);

videosRouter.get('/', getAllVideosController.handle);
videosRouter.get('/from/:id', getUserVideosController.handle);
videosRouter.get('/:id', getVideoController.handle);

videosRouter.delete('/:id', deleteUserVideoController.handle);
videosRouter.put('/:id', updateUserVideoController.handle);

export { videosRouter };
