import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'
import verifyToken from '../middleware/auth'


const DashboardRoutes = (app: express.Application) => {
    app.get('/products-by-category', productByCategory)
    app.get('/order-by-userid',verifyToken, orderByUserId)
    app.get('/complete-order-by-userid', verifyToken, completedOrderByUserId)
    app.get('/five-most-popular-product', fiveMostPopularProduct)
  }

const dashboard = new DashboardQueries();

const productByCategory = async (_req:Request, res: Response) => {
    const products = await dashboard.productByCategory(_req.body.category);
    res.json(products);
}

const orderByUserId = async (_req:Request, res: Response) => {
    const orders = await dashboard.orderByUserId(_req.body.user_id);
    res.json(orders);
}

const completedOrderByUserId = async (_req:Request, res: Response) => {
    const orders = await dashboard.completedOrderByUserId(_req.body.user_id);
    res.json(orders);
}

const fiveMostPopularProduct = async (_req:Request, res: Response) => {
    const products = await dashboard.fiveMostPopularProduct();
    res.json(products);
}

export default DashboardRoutes