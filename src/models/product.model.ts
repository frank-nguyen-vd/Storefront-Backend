import Client from '../database';

export interface ProductType {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
}

export class Product {
  static async index(): Promise<ProductType[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  static async create(data: ProductType): Promise<ProductType> {
    try {
      const conn = await Client.connect();
      const { name, price, category } = data;
      const sql =
        'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [name, price, category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create product ${err}`);
    }
  }

  static async find(data: ProductType): Promise<ProductType[]> {
    try {
      const conn = await Client.connect();
      const { id, name, price, category } = data;
      let conditions = '';
      if (id) conditions += `id = ${id},`;
      if (name) conditions += `name = '${name}',`;
      if (price) conditions += `last_name = '${price}',`;
      if (category) conditions += `username = '${category}',`;
      if (conditions.slice(-1) === ',') conditions = conditions.slice(0, -1);
      const sql = `SELECT * FROM users WHERE ${conditions}`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find product. Error: ${err}`);
    }
  }
}
