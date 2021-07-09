import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_DB, PG_USER, PG_PASS } = process.env;

const client = new Pool({
  host: PG_HOST ?? '127.0.0.1',
  database: PG_DB ?? 'storefront',
  user: PG_USER ?? 'admin',
  password: PG_PASS ?? 'password',
});

export default client;
