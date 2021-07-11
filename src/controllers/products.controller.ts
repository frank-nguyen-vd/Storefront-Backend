import express from 'express';
import { Product } from '../models/product.model';
import {
  createErrMsg,
  createSuccessMsg,
} from '../services/response-template.service';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response): Promise<
  express.Response | undefined
> => {
  const results = await Product.index();
  return res.status(200).json({
    statusCode: 200,
    data: results,
  });
});

router.post('/', async (req: express.Request, res: express.Response): Promise<
  express.Response | undefined
> => {
  if (req.body === {}) {
    return res
      .status(400)
      .send(createErrMsg(400, 'Missing information of the new product'));
  }
  const { name, price, category } = req.body;

  if (!name)
    return res.status(400).send(createErrMsg(400, 'Missing product name'));
  if (!price)
    return res.status(400).send(createErrMsg(400, 'Missing product price'));
  if (!category)
    return res.status(400).send(createErrMsg(400, 'Missing product category'));

  const result = await Product.create({ name, price, category });

  return res.status(200).send(createSuccessMsg(200, result));
});

export default router;