
import * as repository from '../src/repositories/item.repository';

import {createItem, fetchItems, fetchItemById, modifyItem, removeItem} from '../src/services/item.service';

jest.mock('../src/repositories/item.repository');

describe('item service tests', ()=>{
    describe('createItem  function',()=>{
        it('it should call addItem repository and return the created Item', async()=>{
            const newItem = {name: 'Test Item', description: 'Test Description'};
            const mockCreatedItem = {id: 1, ...newItem};

            (repository.addItem as jest.Mock).mockResolvedValue(mockCreatedItem);

            const result = await createItem(newItem);

            expect(repository.addItem).toHaveBeenCalledWith(newItem); // arg required
            expect(result).toEqual(mockCreatedItem);
            
        })
    })

    describe('fetchItems  function', ()=>{
        it('it should call getitem repository and return the fetched item', async()=>{
            const mockGetItem = [
                {id:1, name: 'Test Item 1', description: 'Test Description'},
                {id:2, name: 'Test Item 2', description: 'Test Description'},
            ];

            (repository.getItems as jest.Mock).mockResolvedValue(mockGetItem);
            
            const result = await fetchItems();

            expect(repository.getItems).toHaveBeenCalled(); //arg not required
            expect(result).toEqual(mockGetItem);
        })
    })

    describe('fetchItemsById function', ()=>{
        it('it should call getItemsByid repository and return the fetched item by id', async()=>{
            
            const mockFetchItemById = {id:1, name: 'Test Item 1', description: 'Test Description'};

            (repository.getItemById as jest.Mock).mockResolvedValue(mockFetchItemById);

            const result = await fetchItemById(1);  // arg 1 (Id)

            expect(repository.getItemById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockFetchItemById);
        })

        it('it should call getItemsByid repository and return null if fetched item by id not found', async()=>{
            
            (repository.getItemById as jest.Mock).mockResolvedValue(null);

            const result = await fetchItemById(999);  // arg 1 (Id)

            expect(repository.getItemById).toHaveBeenCalledWith(999);
            expect(result).toBeNull();
        })
    })

    describe('modifyItemsById function', ()=>{
        it('it should call updateItem repository and return the updates the item by id', async()=>{

            const newupdatedItem = {name:'test updated name', description:'updated description'};
            const mockUpdatedItem = {id: 1, ...newupdatedItem};

            (repository.updateItem as jest.Mock).mockResolvedValue(mockUpdatedItem);

            const result = await modifyItem(1, newupdatedItem);  

            expect(repository.updateItem).toHaveBeenCalledWith(1, newupdatedItem);
            expect(result).toEqual(mockUpdatedItem);
        })

        it('it should call updateItem repository and return null if update item by id not found', async()=>{
            
            (repository.updateItem as jest.Mock).mockResolvedValue(null);

            const result = await modifyItem(999, {name: 'updated name', description:'updated description'}); 

            expect(repository.updateItem).toHaveBeenCalledWith(999, {name: 'updated name', description:'updated description'});
            expect(result).toBeNull();
        })
    })

    describe('removeItem by id function', ()=>{
        it('it should call the deleteItem repository and return true', async()=>{

            (repository.deleteItem as jest.Mock).mockResolvedValue(true);

            const result = await removeItem(1);

            expect(repository.deleteItem).toHaveBeenCalledWith(1);
            expect(result).toBeTruthy();
        })

        it('it should call the deleteItem repository and return true', async()=>{

            (repository.deleteItem as jest.Mock).mockResolvedValue(false);

            const result = await removeItem(999);

            expect(repository.deleteItem).toHaveBeenCalledWith(999);
            expect(result).toBeFalsy();
        })
    })

})