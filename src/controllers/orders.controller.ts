import express from 'express';
import { Order } from '../models/order.model';
import {
  createErrMsg,
  createSuccessMsg,
} from '../services/response-template.service';
import { authenticate } from '../services/authentication.service';

const router = express.Router();

router.get(
  '/',
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const results = await Order.index();
    res.status(200).json({
      statusCode: 200,
      data: results,
    });
  },
);

router.post(
  '/',
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      if (req.body === {}) {
        res
          .status(400)
          .send(createErrMsg(400, 'Missing information of the new order'));
        return;
      }
      const { product_id, user_id, qty } = req.body;

      if (!product_id) {
        res.status(400).send(createErrMsg(400, 'Missing product_id'));
        return;
      }
      if (!user_id) {
        res.status(400).send(createErrMsg(400, 'Missing user_id'));
        return;
      }
      if (!qty) {
        res.status(400).send(createErrMsg(400, 'Missing quantity'));
        return;
      }

      const result = await Order.create({
        product_id,
        user_id,
        qty,
        is_completed: false,
      });

      res.status(200).send(createSuccessMsg(200, result));
    } catch (err) {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

router.get(
  '/:id',
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const result = await Order.findById(id);
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
      const result = await Order.deleteById(id);
      res.status(200).send(createSuccessMsg(200, result));
    } catch {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

export default router;
