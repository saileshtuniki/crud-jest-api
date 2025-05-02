import { Router } from 'express';
import {
  addItemController,
  getItemsController,
  getItemByIdController,
  updateItemController,
  deleteItemController
} from '../controllers/item.controller';

const router = Router();

router.post('/items', addItemController);
router.get('/items', getItemsController);
router.get('/items/:id', getItemByIdController);
router.put('/items/:id', updateItemController);
router.delete('/items/:id', deleteItemController);

export default router;