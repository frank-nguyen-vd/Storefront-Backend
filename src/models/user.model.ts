import Client from '../database';

export interface UserType {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
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

  static async find(data: UserType): Promise<UserType[]> {
    try {
      const conn = await Client.connect();
      const { id, first_name, last_name, username } = data;
      let conditions = '';
      if (id) conditions += `id = ${id}`;
      if (first_name) conditions += `first_name = '${first_name}'`;
      if (last_name) conditions += `last_name = '${last_name}'`;
      if (username) conditions += `username = '${username}'`;
      const sql = `SELECT * FROM users WHERE ${conditions}`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find user ${err}`);
    }
  }

  static async findById(id: number): Promise<UserType> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=${id}`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find user ${err}`);
    }
  }

  static async findOne(data: UserType): Promise<UserType> {
    try {
      const result = await this.find(data);
      if (result === []) return {};
      return result[0];
    } catch (err) {
      throw new Error(`Cannot find user ${err}`);
    }
  }

  static async update(data: UserType): Promise<UserType> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *`;
      const result = await conn.query(sql, [
        data.first_name,
        data.last_name,
        data.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find user ${err}`);
    }
  }
}
