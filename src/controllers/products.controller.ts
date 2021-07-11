import express from 'express';
import { Product } from '../models/product.model';

const productsController = express.Router();

productsController.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response | undefined> => {
    const results = await Product.index();
    return res.status(200).json({
      statusCode: 200,
      data: results,
    });
  },
);

export default productsController;
