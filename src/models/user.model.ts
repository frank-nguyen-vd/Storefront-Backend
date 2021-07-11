import Client from '../database';

export interface UserType {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

export class User {
  static async index(): Promise<UserType[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  static async create(data: UserType): Promise<UserType> {
    try {
      const conn = await Client.connect();
      const { first_name, last_name, username, password } = data;
      const sql =
        'INSERT INTO users(first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        first_name,
        last_name,
        username,
        password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create user ${err}`);
    }
  }
}
