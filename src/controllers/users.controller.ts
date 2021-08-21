import express from 'express';
import { User, UserType } from '../models/user.model';
import {
  createErrMsg,
  createSuccessMsg,
} from '../services/response-template.service';
import { authenticate } from '../services/authentication.service';
import { SALT_ROUNDS, PEPPER, TOKEN_SECRET } from '../keys';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();
const pepper = process.env.PEPPER ?? PEPPER;
const salt = parseInt(process.env.SALT_ROUNDS ?? SALT_ROUNDS, 10);
const tokenSecret = process.env.TOKEN_SECRET ?? TOKEN_SECRET;
const secret_user = process.env.SECRET_USER ?? 'admin';
const secret_pass = process.env.SECRET_PASS ?? 'secret';

router.get(
  '/',
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    const results = await User.index();
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
          .send(createErrMsg(400, 'Missing information of the new user'));
        return;
      }
      const { first_name, last_name, username, password } = req.body;

      if (!first_name) {
        res.status(400).send(createErrMsg(400, 'Missing user first name'));
        return;
      }
      if (!last_name) {
        res.status(400).send(createErrMsg(400, 'Missing user last name'));
        return;
      }
      if (!username) {
        res.status(400).send(createErrMsg(400, 'Missing username'));
        return;
      }
      if (!password) {
        res.status(400).send(createErrMsg(400, 'Missing password'));
        return;
      }
      const user = await User.findOne({ username });
      if (user !== undefined || username === secret_user) {
        res.status(400).send(createErrMsg(400, 'User exists'));
        return;
      }

      const hashedPwd = await bcrypt.hash(password + pepper, salt);

      const result = await User.create({
        first_name,
        last_name,
        username,
        password: hashedPwd,
      });

      res.status(200).send(createSuccessMsg(200, result));
    } catch (err) {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

router.post(
  '/login',

  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      if (username !== secret_user && password !== secret_pass) {
        if (username === undefined || password === undefined) {
          res
            .status(400)
            .send(createErrMsg(400, 'Missing username or password'));
          return;
        }
        const user = await User.findOne({ username });
        if (
          user === undefined ||
          user.password === undefined ||
          !bcrypt.compareSync(password + pepper, user.password)
        ) {
          res
            .status(400)
            .send(createErrMsg(400, 'Invalid username or password'));
          return;
        }
      }

      const token = jwt.sign(
        {
          username,
        },
        tokenSecret,
        { expiresIn: '1800s' },
      );
      res.status(200).send(createSuccessMsg(200, token));
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
      const result = await User.findById(id);
      res.status(200).send(createSuccessMsg(200, result));
    } catch {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

router.patch(
  '/:id',
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const user: UserType = await User.findById(id);
      if (user === undefined) {
        res.status(404).send(createErrMsg(404, 'User not found'));
        return;
      }
      const { first_name, last_name } = req.body;
      if (first_name) {
        user.first_name = first_name;
      }
      if (last_name) {
        user.last_name = last_name;
      }

      const result = await User.update(user);
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
      const user: UserType = await User.findById(id);
      if (user === undefined) {
        res.status(404).send(createErrMsg(404, 'User not found'));
        return;
      }
      const result = await User.deleteById(id);
      res.status(200).send(createSuccessMsg(200, result));
    } catch {
      res.status(500).send(createErrMsg(500, 'Internal Server Error'));
    }
  },
);

export default router;
