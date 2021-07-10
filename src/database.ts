import dotenv from 'dotenv';
import { Pool } from 'pg';
import dbConfig from '../database.json';

dotenv.config();

const { host, database, user, password } = dbConfig.dev;

const client = new Pool({
  host,
  database,
  user,
  password,
});

export default client;
