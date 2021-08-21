import { before } from 'lodash';
import supertest from 'supertest';
import app from '../index';
import dotenv from 'dotenv';

dotenv.config();
const secret_user = process.env.SECRET_USER ?? 'admin';
const secret_pass = process.env.SECRET_PASS ?? 'secret';

const req = supertest(app);

let token: string;

describe('Testing Endpoints', () => {
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
        .set('Authorization', 'Bearer' + token);
      expect(res.status).toBe(200);
    });
  });
});
