import express from 'express';
import { Product } from '../models/product.model';
import { authenticate } from '../services/authentication.service';
import {
  createErrMsg,
  createSuccessMsg,
} from '../services/response-template.service';
import _ from 'lodash';
const router = express.Router();

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response | undefined> => {
    let results: unknown[] = [];

    if (_.isEmpty(req.query)) {
      results = await Product.index();
      return res.status(200).json({
        statusCode: 200,
        data: results,
      });
    } else if (req.query.category) {
      results = await Product.findByCategory(
        req.query.category as unknown as string,
      );
    }
    return res.status(200).json({
      statusCode: 200,
      data: results,
    });
  },
);

router.post(
  '/',
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response | undefined> => {
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
      return res
        .status(400)
        .send(createErrMsg(400, 'Missing product category'));

    const result = await Product.create({ name, price, category });

    return res.status(200).send(createSuccessMsg(200, result));
  },
);

export default router;
