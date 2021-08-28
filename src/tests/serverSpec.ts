import { doesNotMatch } from 'assert';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

let token: string;

describe('Test endpoint responses', () => {

    // get token
    beforeAll(async () => {
        const response = await request.post('/authenticate')
            .send({'username':'user1', 'password':'password123'});
        token = response.body.token;
    })

    describe('User endpoint', () => {
        it('Create user endpoint', async () => {
            const response = await request.post('/users');
            expect(response.status).toBe(200);
          });

          it('Unauthorized index user endpoint', async () => {
            const response = await request.get('/users');
            expect(response.status).toBe(401);
          });

          it('Unauthorized show user endpoint', async () => {
            const response = await request.get('/users/1');
            expect(response.status).toBe(401);
          });

          it('Authenticate user endpoint', async () => {
            const response = await request.post('/authenticate')
            expect(response.status).toBe(200);
          });

          it('Authorized index user endpoint', async () => {
            const response = await request.get('/users')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

          it('Authorized show user endpoint', async () => {
            const response = await request.get('/users/1')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

    });

    describe('Product endpoint', () => {
        it('Unauthorized create product endpoint', async () => {
            const response = await request.post('/products');
            expect(response.status).toBe(401);
          });

        it('Authorized create product endpoint', async () => {
            const response = await request.post('/products')
            .send({'name':'fork', 'price':5})
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

          it('Index product endpoint', async () => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
          });

          it('Unauthorized show product endpoint', async () => {
            const response = await request.get('/products/1');
            expect(response.status).toBe(401);
          });

          it('Authorized show product endpoint', async () => {
            const response = await request.get('/products/1')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

    });

    describe('Order endpoint', () => {
        it('Unauthorized create order endpoint', async () => {
            const response = await request.post('/orders');
            expect(response.status).toBe(401);
          });

        it('Authorized create order endpoint', async () => {
            const response = await request.post('/orders')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

          it('Index order endpoint', async () => {
            const response = await request.get('/orders');
            expect(response.status).toBe(200);
          });

          it('Unauthorized show order endpoint', async () => {
            const response = await request.get('/orders/1');
            expect(response.status).toBe(401);
          });

          it('Authorized show order endpoint', async () => {
            const response = await request.get('/orders/1')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

          it('Unauthorized addProduct order endpoint', async () => {
            const response = await request.post('/orders/1/products');
            expect(response.status).toBe(401);
          });

          it('Authorized addProduct order endpoint', async () => {
            const response = await request.post('/orders/1/products')
            .send({'quantity':5, 'product_id':'1'})
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
          });

    });

    describe('Dashboard endpoint', () => {
        it('Products by category endpoint', async () => {
            const response = await request.get('/products-by-category');
            expect(response.status).toBe(200);
        });

        it('Unauthorized order by user id endpoint', async () => {
            const response = await request.get('/order-by-userid');
            expect(response.status).toBe(401);
        });

        it('Authorized  order by user id endpoint', async () => {
            const response = await request.get('/order-by-userid')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
        });

        it('Five most popular product endpoint', async () => {
            const response = await request.get('/five-most-popular-product');
            expect(response.status).toBe(200);
        });

        it('Unauthorized completed order by user id endpoint', async () => {
            const response = await request.get('/complete-order-by-userid');
            expect(response.status).toBe(401);
        });

        it('Authorized completed order by user id endpoint', async () => {
            const response = await request.get('/complete-order-by-userid')
            .set('Authorization', 'Bearer ' + token);
            expect(response.status).toBe(200);
        });

    });
});
