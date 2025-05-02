
// mock the database , so real db dont effect

jest.mock('../src/config/db', () => ({
    query: jest.fn(), // Mock the query method
  }));
  
import pool from '../src/config/db'; // Import the mocked pool

// import {Item} from '../src/models/item.model'
import {addItem, getItems, getItemById, updateItem, deleteItem } from '../src/repositories/item.repository';


describe('addItem', ()=>{
    it('should insert a new item into the database', async()=>{
        const newItem = {name: 'Test item', description:'Test description'};
        
        (pool.query as jest.Mock).mockResolvedValue({
          rows:[{id: 1, ...newItem}]
        });
        
        const addedItem = await addItem(newItem);

        expect(addedItem).toBeDefined();
        expect(addedItem.id).toBe(1);
        expect(addedItem.name).toBe(newItem.name);
        expect(addedItem.description).toBe(newItem.description);

        // Ensure pool.query was called correctly
        expect(pool.query).toHaveBeenCalledWith(
            'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
            [newItem.name, newItem.description]
        );

    })
})

describe('getItems', ()=>{

  beforeEach(()=>{
    jest.clearAllMocks();  //clear prvious mock calls
  })

    it('it should retrive all items from the database', async()=>{

        const mockItems = [
            {name: 'Item 1', description:'Description 1'},
            {name: 'Item 2', description:'Description 2'}
        ];

        //mock the query response
        (pool.query as jest.Mock).mockResolvedValueOnce({rows: mockItems});

        const items = await getItems();

        expect(items).toBeDefined();
        expect(Array.isArray(items)).toBe(true);
        expect(items.length).toBe(2);
        expect(items[0].name).toBe('Item 1');
        expect(items[0].description).toBe('Description 1');

        expect(pool.query).toHaveBeenCalledWith(
            `SELECT * FROM items`
        );
    })
})

describe('getItemById', ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  })
    it('should retrive an item by its Id', async()=>{

        const mockItem = {id: 1, name: 'Item 1', description: 'Description 1'};

        //mock the quey response
        (pool.query as jest.Mock).mockResolvedValueOnce({rows: [mockItem]});

        const item = await getItemById(1); // assume you have a func like this

        expect(item).toBeDefined();
        expect(item?.id).toBe(1);
        expect(item?.name).toBe('Item 1');
        expect(item?.description).toBe('Description 1');

        expect(pool.query).toHaveBeenCalledWith(
            `SELECT * FROM items WHERE id = $1`,[1]
        );
    })

    it('should return null if item Id not found', async()=>{

      (pool.query as jest.Mock).mockResolvedValueOnce({rows:[]}) //simulates no items found

        const fetchedItem = await getItemById(999); //non-existing Id

        expect(fetchedItem).toBeNull();

        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM items WHERE id = $1', [999]);
    })
});

describe('updateItem', () => {
    beforeEach(()=>{
      jest.clearAllMocks();

      // Reset the mock implementation for each test
      (pool.query as jest.Mock).mockReset();
    });

    it('should update an item in the database', async () => {
      // Insert test data
      // const updatedItem = {id: 1,name: 'Updated Item', description: 'Updated Description' };
  
      // first call : for getItemById
      (pool.query as jest.Mock)
      .mockResolvedValueOnce({
        rows: [{ id: 1, name: 'Test item', description: 'Test description' }]
      })
      //second callfor the update query
      .mockResolvedValueOnce({
        rows: [{ id: 1, name: 'Updated Item', description: 'Updated Description' }]
      })
  
      const result = await updateItem(1, {
        name: 'Updated Item',
        description: 'Updated Description',
      });

      // Assertions
      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.name).toBe('Updated Item');
      expect(result?.description).toBe('Updated Description');

      // Ensure the correct queries were made
    expect(pool.query).toHaveBeenNthCalledWith(1,
      'SELECT * FROM items WHERE id = $1',
      [1]
    );

    expect(pool.query).toHaveBeenNthCalledWith(2,
        'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        ['Updated Item', 'Updated Description', 1]
      );

    });
  
 
      it('should return null if item ID does not exist', async () => {

        //mock the query response
        (pool.query as jest.Mock).mockResolvedValueOnce({rows:[]});

      const result = await updateItem(999, { name: 'Non-existing Item', description: 'Some Description' });

      // Assertions
      expect(result).toBeNull();
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM items WHERE id = $1',
      [999]
      );
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

  });
  

  describe('deleteItem', () => {
    it('should delete an item from the database and return true', async () => {

    //mock the query response
    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

      // Insert test data
      const result = await deleteItem(1);

      // Assertions
      expect(result).toBe(true);

      expect(pool.query).toHaveBeenCalledWith('DELETE FROM items WHERE id = $1', [1]);
  
    });
  
    it('should return false if item ID does not exist', async () => {
    // mock the query response
    (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

    const result = await deleteItem(999); // Non-existing ID
        
    expect(result).toBe(false);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM items WHERE id = $1', [999]);
    });
  });
  

