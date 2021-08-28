// @ts-ignore
import Client from '../database'

export type Order = {
    id?: Number;
    status: String;
    user_id: string;
}

export class OrderStore {

    async create(o: Order): Promise<Order> {
        try {
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [o.status, o.user_id])
  
      const order = result.rows[0]
  
      conn.release()
  
      return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.status} ${o.user_id}. Error: ${err}`)
        }
    }

    async index(): Promise<Order[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'SELECT * FROM orders'
      
          const result = await conn.query(sql)
      
          conn.release()
      
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
      }
    
    async show(id: string): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

    async addProduct(quantity: number, order_id: string, product_id: string): Promise<{id:number, quantity:number, product_id: string, order_id: string}> {
      // check order if it is active
      try {
        const ordersql = 'SELECT * FROM orders WHERE id=($1)'
        //@ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(ordersql, [order_id])

        const order = result.rows[0]

        if (order.status !== "active") {
          throw new Error(`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`)
        }

        conn.release()
      } catch (err) {
        throw new Error(`${err}`)
      }

        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn
              .query(sql, [quantity, order_id, product_id])
    
          const order_products = result.rows[0]
    
          conn.release()
    
          return order_products
        } catch (err) {
          throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
      }
}