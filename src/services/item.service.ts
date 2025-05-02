import { addItem, getItems, getItemById, updateItem, deleteItem } from '../repositories/item.repository';
import { Item } from '../models/item.model';

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  return await addItem(item);
};

export const fetchItems = async (): Promise<Item[]> => {
  return await getItems();
};

export const fetchItemById = async (id: number): Promise<Item | null> => {
  return await getItemById(id);
};

export const modifyItem = async (id: number, item: Partial<Omit<Item, 'id'>>): Promise<Item | null> => {
  return await updateItem(id, item);
};

export const removeItem = async (id: number): Promise<boolean> => {
  return await deleteItem(id);
};
