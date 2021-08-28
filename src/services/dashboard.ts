// @ts-ignore
import Client from '../database'
import {Product} from '../models/product'
import {Order} from '../models/order'

export class DashboardQueries{
    async productByCategory(category: String): Promise<Product[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category = ($1)';

            const result = await conn.query(sql, [category]);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get products by category ${category}: ${err}`)
        }
    }


    async orderByUserId(userId: number): Promise<Order[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders where user_id = ($1)';

            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get orders by userID ${userId}: ${err}`)
        }
    }


    async completedOrderByUserId(userId: number): Promise<Order[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders where user_id = ($1) AND status = \'complete\'';

            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get completed orders by userID ${userId}: ${err}`)
        }
    }

    async fiveMostPopularProduct(): Promise<Product[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT name, price, category, SUM(quantity) FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY SUM(quantity) DESC LIMIT 5';

            const result = await conn.query(sql);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get five most popular products: ${err}`)
        }
    }
}