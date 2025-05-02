// import request from 'supertest';
// import app from '../src/server'; // Import your Express app
// import pool from '../src/config/db'; // Import the database pool

// beforeAll(async () => {
//   // Ensure the items table exists
//   await pool.query(`
//     CREATE TABLE IF NOT EXISTS items (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL
//     )
//   `);
// });

// afterAll(async () => {
//   // Drop the table and close the pool after tests
//   await pool.query('DROP TABLE IF EXISTS items');
//   await pool.end();
// });

// describe('API Tests for CRUD Operations', () => {
//   let createdItemId: number;

//   it('should add a new item', async () => {
//     const response = await request(app).post('/api/items').send({
//       name: 'Test Item',
//       description: 'This is a test item'
//     });
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('id');
//     createdItemId = response.body.id;
//   });

//   it('should fetch all items', async () => {
//     const response = await request(app).get('/api/items');
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });

//   it('should fetch an item by ID', async () => {
//     const response = await request(app).get(`/api/items/${createdItemId}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('id', createdItemId);
//   });

//   it('should update an item', async () => {
//     const response = await request(app).put(`/api/items/${createdItemId}`).send({
//       name: 'Updated Item',
//       description: 'Updated description'
//     });
//     expect(response.status).toBe(200);
//     expect(response.body.name).toBe('Updated Item');
//   });

//   it('should delete an item', async () => {
//     const response = await request(app).delete(`/api/items/${createdItemId}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('message', 'Item deleted successfully.');
//   });
// });

// item.repository.test.ts


// mock the database , so real db dont effect

// jest.mock('../config/db', () => ({
//     query: jest.fn(), // Mock the query method
//   }));
  
// import pool from '../src/config/db'; // Import the mocked pool

// import {Item} from '../src/models/item.model'
// import {addItem, getItems, getItemById, updateItem, deleteItem } from '../src/repositories/item.repository';



// beforeAll(async ()=>{
//     await pool.query(
//         `CREATE TABLE IF NOT EXISTS items (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             description TEXT NOT NULL);`
//     );
// });

// afterAll(async ()=>{
//     // after all tests table will be dropped
//     await pool.query(`DROP TABLE IF EXISTS items;`);
//     await pool.end(); // close the connection pool.
// });

// describe('addItem', ()=>{
//     it('should insert a new item into the database', async()=>{
//         const newItem = {name: 'Test item', description:'Test description'}
//         const addedItem = await addItem(newItem);

//         expect(addedItem).toBeDefined();
//         expect(addedItem.id).toBeGreaterThan(0);
//         expect(addedItem.name).toBe(newItem.name);
//         expect(addedItem.description).toBe(newItem.description);

//     })
// })

// describe('getItems', ()=>{
//     it('it should retrive all items from the database', async()=>{

//         //insert test data
//         await addItem({name: 'Item 1', description:'Description 1'});
//         await addItem({name: 'Item 2', description:'Description 2'});

//         const items = await getItems();

//         expect(items).toBeDefined();
//         expect(Array.isArray(items)).toBe(true);
//         expect(items.length).toBe(2);
//         expect(items[0].name).toBe('Item 1');
//         expect(items[0].description).toBe('Description 2');
//     })
// })

// describe('getItemById', ()=>{
//     it('should retrive an item by its Id', async()=>{

//         const newItem = await addItem({name: 'Item 1', description: 'Item 1 description'});
//         const fetchedItem = await getItemById(newItem.id);

//         expect(fetchedItem).toBeDefined();
//         expect(fetchedItem?.id).toBe(newItem.id);
//         expect(fetchedItem?.name).toBe(newItem.name);
//         expect(fetchedItem?.description).toBe(newItem.description);
//     })

//     it('should return null if item Id not found', async()=>{
//         const fetchedItem = await getItemById(999); //non-existing Id

//         expect(fetchedItem).toBeNull();
//     })
// });

// describe('updateItem', () => {
//     it('should update an item in the database', async () => {
//       // Insert test data
//       const newItem = await addItem({ name: 'Item 1', description: 'Description 1' });
  
//       // Update the item
//       const updatedItem = await updateItem(newItem.id, { name: 'Updated Item', description: 'Updated Description' });
  
//       // Assertions
//       expect(updatedItem).toBeDefined();
//       expect(updatedItem?.id).toBe(newItem.id);
//       expect(updatedItem?.name).toBe('Updated Item');
//       expect(updatedItem?.description).toBe('Updated Description');
//     });
  
//     it('should return null if item ID does not exist', async () => {
//       const updatedItem = await updateItem(999, { name: 'Non-existing Item' });
  
//       // Assertions
//       expect(updatedItem).toBeNull();
//     });
//   });
  

//   describe('deleteItem', () => {
//     it('should delete an item from the database', async () => {
//       // Insert test data
//       const newItem = await addItem({ name: 'Item to Delete', description: 'Description' });
  
//       const deleteResult = await deleteItem(newItem.id);
  
//       // Assertions
//       expect(deleteResult).toBe(true);
  
//       // Verify item is deleted
//       const fetchedItem = await getItemById(newItem.id);
//       expect(fetchedItem).toBeNull();
//     });
  
//     it('should return false if item ID does not exist', async () => {
//       const deleteResult = await deleteItem(999); // Non-existing ID
  
//       // Assertions
//       expect(deleteResult).toBe(false);
//     });
//   });
  

 //   it('should return null if item ID does not exist', async () => {

  //       //mock the query response
  //       (pool.query as jest.Mock).mockResolvedValueOnce({rows:[]});

  //     const result = await updateItem(999, { name: 'Non-existing Item', description: 'Some Description' });
  
  //     // Assertions
  //     expect(result).toBeNull();
  //     expect(pool.query).toHaveBeenCalledWith(
  //       'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
  //     ['Non-existent Item', undefined, 999]
  //     )
  //   });