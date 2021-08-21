import { before } from 'lodash';
import supertest from 'supertest';
import app from '../index';
import dotenv from 'dotenv';

dotenv.config();
const secret_user = process.env.SECRET_USER ?? 'admin';
const secret_pass = process.env.SECRET_PASS ?? 'secret';

const req = supertest(app);

let token: string;

let userId: number;
let productId: number;
let orderId: number;
describe('Endpoints', () => {
  beforeAll(async () => {
    const res = await req.post('/api/users/login').send({
      username: secret_user,
      password: secret_pass,
    });
    token = res.body.data;
  });

  describe('/api/users', () => {
    it('Can create a new user', async () => {
      const res = await req
        .post('/api/users')
        .send({
          first_name: 'Arcadia',
          last_name: 'Oak',
          username: 'redfox',
          password: 'abc123',
        })
        .set('Authorization', 'Bearer ' + token);

      expect(res.status).toBe(200);
      userId = res.body.data.id;
    });
    it('Can log in', async () => {
      const res = await req.post('/api/users/login').send({
        username: 'redfox',
        password: 'abc123',
      });

      expect(res.status).toBe(200);
    });
    it('Can get a list of users', async () => {
      const res = await req
        .get('/api/users')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });
    it('Can get an user by id', async () => {
      const res = await req
        .get(`/api/users/${userId}`)
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });
  });

  describe('/api/products', () => {
    it('Can create a new product', async () => {
      const res = await req
        .post('/api/products')
        .send({
          name: 'Tiffany Chair',
          price: 129.99,
          category: 'Household',
        })
        .set('Authorization', 'Bearer ' + token);

      expect(res.status).toBe(200);
      productId = res.body.data.id;
    });
    it('Can list all products', async () => {
      const res = await req.get('/api/products');
      expect(res.status).toBe(200);
    });

    it('Can get a product by id', async () => {
      const res = await req.get(`/api/products/${productId}`);
      expect(res.status).toBe(200);
    });
  });

  describe('/api/orders', () => {
    it('Can create a new orders', async () => {
      const res = await req
        .post('/api/orders')
        .send({
          product_id: productId,
          user_id: userId,
          qty: 1,
        })
        .set('Authorization', 'Bearer ' + token);

      expect(res.status).toBe(200);
      orderId = res.body.data.id;
    });
    it('Can list all orders', async () => {
      const res = await req
        .get('/api/orders')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toBe(200);
    });

    it('Can get an order by id', async () => {
      const res = await req.get(`/api/products/${orderId}`);
      expect(res.status).toBe(200);
    });
  });

  afterAll(async () => {
    await req
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', 'Bearer ' + token);

    await req
      .delete(`/api/users/${userId}`)
      .set('Authorization', 'Bearer ' + token);

    await req
      .delete(`/api/products/${productId}`)
      .set('Authorization', 'Bearer ' + token);
  });
});
