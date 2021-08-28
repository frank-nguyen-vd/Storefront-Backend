import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyToken, {RequestCustom} from '../middleware/auth'

const store = new ProductStore();


const create = async (_req: Request, res: Response) => {
    try {
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category ?? null
        }
        const newOrder = await store.create(product)

        res.json(newOrder)
    } catch(err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
  }
  
const show = async (req: Request, res: Response) => {
      const customReq = req as RequestCustom
      /*
      console.log(customReq.decodeJwt)
      if(customReq.decodeJwt.user.id == req.params.id){
          console.log('id is same')
      }
      else{
          console.log('id is different')
      }
      */
     const product = await store.show(req.params.id)
     res.json(product)
  }

const ProductRoutes = (app: express.Application) => {
    app.post('/products',verifyToken, create)
    app.get('/products', index)
    app.get('/products/:id',verifyToken, show)
  }

export default ProductRoutes