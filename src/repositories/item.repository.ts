import pool from '../config/db';
import { Item } from '../models/item.model';

export const addItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const result = await pool.query(
    'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
    [item.name, item.description]
  );
  return result.rows[0];
};

export const getItems = async (): Promise<Item[]> => {
  const result = await pool.query('SELECT * FROM items');
  return result.rows;
};

export const getItemById = async (id: number): Promise<Item | null> => {
  const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const updateItem = async (id: number, item: Partial<Omit<Item, 'id'>>): Promise<Item | null> => {
  // First, fetch the existing item to merge changes.
  const currentItem = await getItemById(id);
  if (!currentItem) return null;

  const updatedName = item.name || currentItem.name;
  const updatedDescription = item.description || currentItem.description;

  const result = await pool.query(
    'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [updatedName, updatedDescription, id]
  );
  return result.rows[0];
};

export const deleteItem = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM items WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};