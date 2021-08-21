import Client from '../database';

export interface OrderType {
  id?: number;
  product_id?: number;
  qty?: number;
  user_id?: number;
  is_completed?: boolean;
}

export class Order {
  static async index(): Promise<OrderType[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders ORDER BY id ASC';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot list all orders. Error: ${err}`);
    }
  }

  static async create(data: OrderType): Promise<OrderType> {
    try {
      const conn = await Client.connect();
      const { product_id, user_id, qty, is_completed } = data;
      const sql =
        'INSERT INTO orders(product_id, user_id, qty, is_completed) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        product_id,
        user_id,
        qty,
        is_completed,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create a new order. Error: ${err}`);
    }
  }

  static async find(data: OrderType): Promise<OrderType[]> {
    try {
      const conn = await Client.connect();
      const { id, product_id, user_id, qty, is_completed } = data;
      let conditions = '';
      if (id) conditions += `id = ${id},`;
      if (product_id) conditions += `product_id = '${product_id}',`;
      if (user_id) conditions += `user_id = '${user_id}',`;
      if (qty) conditions += `qty = '${qty}',`;
      if (is_completed) conditions += `is_completed = '${is_completed}',`;
      if (conditions.slice(-1) === ',') conditions = conditions.slice(0, -1);
      const sql = `SELECT * FROM orders WHERE ${conditions}  ORDER BY id ASC`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot find order. Error: ${err}`);
    }
  }

  static async show(id: number): Promise<OrderType> {
    return this.findById(id);
  }

  static async findById(id: number): Promise<OrderType> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE id=${id}  ORDER BY id ASC`;

      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find order. Error: ${err}`);
    }
  }

  static async findOne(data: OrderType): Promise<OrderType> {
    try {
      const result = await this.find(data);
      if (result === []) return {};
      return result[0];
    } catch (err) {
      throw new Error(`Cannot find order. Error: ${err}`);
    }
  }

  static async deleteById(id: number): Promise<OrderType> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM orders WHERE id = ${id} RETURNING *`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete order. Error: ${err}`);
    }
  }
}
