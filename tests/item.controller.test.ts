// import { createItem } from './../src/services/item.service';
import request from 'supertest';
import app from '../src/server';
import * as service from '../src/services/item.service';
// import { createItem, fetchItems, fetchItemById, modifyItem, removeItem } from '../services/item.service';


jest.mock('../src/services/item.service');

describe('Item controllers Tests', () =>{

    describe('POST /api/items (addItemController)', ()=>{
        it('it should create a new Item and return a 201 status', async()=>{
            const newItem = {name: 'Test Item', description: 'any test description'}
            const mockCreatedItem = {id: 1, ...newItem};

            //mock the service function
            (service.createItem as jest.Mock).mockResolvedValue(mockCreatedItem);

            const response = await request(app).post('/api/items').send(newItem);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockCreatedItem);
            expect(service.createItem).toHaveBeenLastCalledWith(newItem);
        });

        it('should return 500 if service throws an error', async()=>{
            const newItem = {name: 'Test Item', description: 'any test description'};

            //mock service function to throw the error
            (service.createItem as jest.Mock).mockRejectedValue(new Error('Server Error'));

            const response = await request(app).post('/api/items').send(newItem);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    })

    //getcontroller
    describe('GET /api/items (getControllerItem)',()=>{
        it('it should get the item details which have created and return status 200', async()=>{
            const mockItem = [
                {id: 1, name: 'Item 1' , description: 'Test description of item 1'},
                {id: 2, name: 'Item 2' , description: 'Test description of item 2'},
            ];

            // mock the service function 
            (service.fetchItems as jest.Mock).mockResolvedValue(mockItem);

            const response = await request(app).get('/api/items').send(mockItem);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockItem);
            // expect(service.fetchItems).toHaveBeenCalledWith
        })

        it('it should return a 500 if there is any error', async()=>{
            const mockItem = [
                {id: 1, name: 'Item 1' , description: 'Test description of item 1'},
                {id: 2, name: 'Item 2' , description: 'Test description of item 2'},
            ];

            // mock the service funtion
            (service.fetchItems as jest.Mock).mockRejectedValue(new Error ('Server error'));

            const response = await request(app).get('/api/items').send(mockItem);

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    })

    // getItemIdController
    describe('GET /api/items/:id getItemIdController' ,()=>{
        it('it should get the item based on Id and should return status 200 ', async()=>{
            const newItem = {id: 1, name: 'Item 1', description: 'item 1 description'};
            // const mockedUpdatedItem = {, ...newItem};
            //mock the service function
            (service.fetchItemById as jest.Mock).mockResolvedValue(newItem);

            const response = await request(app).get(`/api/items/${newItem.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(newItem);
        });

        it('it should return status of 404, if fetchItemById is failed', async()=>{
            // const mockItem = {id: 1, name: 'item 1', description: 'item 1 description'};

            //mock the service func
            (service.fetchItemById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/api/items/1');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Item not found.');
        });

        it('it should return 500, if there is server error', async()=>{

            //mock the service func to throw an error
            (service.fetchItemById as jest.Mock).mockRejectedValue(new Error('Server Error'));

            const response = await request(app).get('/api/items/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    })

    //updateController
    describe('Put /api/items/:id updateItemController', ()=>{
        it('it should update item based on id and return status 200', async()=>{
            const newItem =  { name: 'Item 2' , description: 'Item 2 description'};

            const newUpdatedItem = {id: 1, ...newItem};
            
            //mock the service func
            (service.modifyItem as jest.Mock).mockResolvedValue(newUpdatedItem);

            const response = await request(app).put(`/api/items/${newUpdatedItem.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(newUpdatedItem);
        })
        it('it should return status of 404, if modifyItem is failed', async()=>{
            // const mockUpdaedItem = {id: 1, name: 'item 1', description: 'item 1 description'};

            //mock the service func
            (service.modifyItem as jest.Mock).mockResolvedValue(null)

            const response = await request(app).put('/api/items/1');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Item not found');
        });
        it('should return 500 if the modifyItem has failed', async()=>{

            //mock the service func to throw error
            (service.modifyItem as jest.Mock).mockRejectedValue(new Error('Server error'));

            const response = await request(app).put('/api/items/1');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    })

    //deleteItemController
    describe('delete /api/items/:id deleteItemController',()=>{
        it('it should delete the item by id and return status 200', async()=>{

            //mock the service func
            (service.removeItem as jest.Mock).mockResolvedValue(true);

            const response = await request(app).delete(`/api/items/1`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Item deleted successfully');
        });

        it('it should return 404 if item is not found', async()=>{

            //mock the service func to return false
            (service.removeItem as jest.Mock).mockResolvedValue(false);

            const response = await request(app).delete('/api/items/999');

            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Item not found');
        })

        it('should return 500 if the removeItem has failed', async()=>{

            //mock the service func to throw error
            (service.removeItem as jest.Mock).mockRejectedValue(new Error('Server error'));

            const response = await request(app).put('/api/items/999');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Internal server error');
        });
    })
})



