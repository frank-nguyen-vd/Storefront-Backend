import Client from '../database';

export interface ProductType {
  id: number;
  name: string;
  price: number;
  category: string;
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
      throw new Error(`Cannot get product ${err}`);
    }
  }
}
