import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import verifyToken from '../middleware/auth'

const store = new OrderStore();

const create = async (_req: Request, res: Response) => {
    try {
        const order: Order = {
            status: _req.body.status,
            user_id: _req.body.user_id
        }
        const newOrder = await store.create(order)

        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
  }
  
  const show = async (req: Request, res: Response) => {
     const order = await store.show(req.params.id)
     res.json(order)
  }

const OrderRoutes = (app: express.Application) => {
    app.post('/orders',verifyToken, create)
    app.get('/orders', index)
    app.get('/orders/:id',verifyToken, show)
    app.post('/orders/:id/products',verifyToken, addProduct)
  }

const addProduct = async (_req: Request, res: Response) => {
    const order_id: string = _req.params.id
    const product_id: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, order_id, product_id)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
}

export default OrderRoutes