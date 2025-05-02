import { Request, Response } from 'express';
import { createItem, fetchItems, fetchItemById, modifyItem, removeItem } from '../services/item.service';

export const addItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await createItem(req.body);
    res.status(201).json(item);
    return 
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal server error' });
    return 
  }
};

export const getItemsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await fetchItems();
    res.status(200).json(items);
    return 
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error'});
    return 
  }
};

export const getItemByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await fetchItemById(id);
    if (item) {
        res.status(200).json(item);
      return 
    }
    res.status(404).json({ error: 'Item not found.' });
    return 
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
    return 
  }
};

export const updateItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedItem = await modifyItem(id, req.body);
    if (updatedItem) {
        res.status(200).json(updatedItem);
        return 
    }
    res.status(404).json({ error: 'Item not found' });
    return 
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
    return 
  }
};

export const deleteItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await removeItem(id);
    if (success) {
        res.status(200).json({ message: 'Item deleted successfully' });
        return 
    }
        res.status(404).json({ error: 'Item not found' });
        return 
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
    return 
  }
};

export * from './item.controller';