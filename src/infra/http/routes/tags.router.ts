import { Router } from 'express';

import { CreateTagController } from '../controllers/tags/CreateTagController';
import { DeleteTagController } from '../controllers/tags/DeleteTagController';
import { GetAllTagsController } from '../controllers/tags/GetAllTagsController';
import { UpdateTagController } from '../controllers/tags/UpdateTagController';

const tagsRouter = Router();

const getAllTagsController = new GetAllTagsController();
const createTagController = new CreateTagController();

const deleteTagController = new DeleteTagController();
const updateTagController = new UpdateTagController();

tagsRouter.get('/', getAllTagsController.handle);
tagsRouter.post('/', createTagController.handle);
tagsRouter.delete('/:id', deleteTagController.handle);
tagsRouter.put('/:id', updateTagController.handle);

export { tagsRouter };
