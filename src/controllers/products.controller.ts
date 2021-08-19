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
    try {
      let results: unknown[] = [];

      if (_.isEmpty(req.query)) {
        results = await Product.index();
      } else if (req.query.category) {
        results = await Product.findByCategory(
          req.query.category as unknown as string,
        );
      } else if ('popular' in req.query) {
        const limit = parseInt(req.params.limit);
        results = await Product.findPopular(limit);
      }
      return res.status(200).json({
        statusCode: 200,
        data: results,
      });
    } catch (err) {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

router.post(
  '/',
  authenticate,
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

router.get(
  '/:id',
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const result = await Product.findById(id);
      res.status(200).send(createSuccessMsg(200, result));
    } catch {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

router.delete(
  '/:id',
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const result = await Product.deleteById(id);
      res.status(200).send(createSuccessMsg(200, result));
    } catch {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

export default router;
