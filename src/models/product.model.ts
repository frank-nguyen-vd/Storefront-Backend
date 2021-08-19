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
      throw new Error(`Cannot list products ${err}`);
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
      const sql = `SELECT * FROM products WHERE ${conditions}`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find product. Error: ${err}`);
    }
  }

  static async findById(id: number): Promise<ProductType> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE id=${id} ORDER BY id ASC`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find product by id. Error: ${err}`);
    }
  }

  static async findByCategory(category: string): Promise<ProductType> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE category=${category} ORDER BY id ASC`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find product. Error: ${err}`);
    }
  }

  static async findOne(data: ProductType): Promise<ProductType> {
    try {
      const result = await this.find(data);
      if (result === []) return {};
      return result[0];
    } catch (err) {
      throw new Error(`Cannot find product. Error: ${err}`);
    }
  }

  static async update(data: ProductType): Promise<ProductType> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *`;
      const result = await conn.query(sql, [
        data.name,
        data.price,
        data.category,
        data.id,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update product. Error: ${err}`);
    }
  }

  static async deleteById(id: number): Promise<ProductType> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM products WHERE id = ${id} RETURNING *`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete product. Error: ${err}`);
    }
  }
}
