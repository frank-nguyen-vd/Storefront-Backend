import express from 'express';
import { User } from '../models/user.model';
import {
  createErrMsg,
  createSuccessMsg,
} from '../services/response-template.service';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response): Promise<
  express.Response | undefined
> => {
  const results = await User.index();
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
      .send(createErrMsg(400, 'Missing information of the new user'));
  }
  const { first_name, last_name, username, password } = req.body;

  if (!first_name)
    return res.status(400).send(createErrMsg(400, 'Missing user first name'));
  if (!last_name)
    return res.status(400).send(createErrMsg(400, 'Missing user last name'));
  if (!username)
    return res.status(400).send(createErrMsg(400, 'Missing username'));
  if (!password)
    return res.status(400).send(createErrMsg(400, 'Missing password'));
  if (User.findOne({ username }))
    return res.status(400).send(createErrMsg(400, 'User exists'));

  const pepper = process.env.Pepper ?? 'secret';
  const salt = parseInt(process.env.SaltRounds ?? '10', 10);
  const hashedPwd = await bcrypt.hash(password + pepper, salt);

  const result = await User.create({
    first_name,
    last_name,
    username,
    password: hashedPwd,
  });

  return res.status(200).send(createSuccessMsg(200, result));
});

export default router;
