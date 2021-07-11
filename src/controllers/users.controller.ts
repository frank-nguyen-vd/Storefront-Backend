import express from 'express';
import { User } from '../models/user.model';
import {
  createErrMsg,
  createSuccessMsg,
} from '../services/response-template.service';

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

  const result = await User.create({
    first_name,
    last_name,
    username,
    password,
  });

  return res.status(200).send(createSuccessMsg(200, result));
});

export default router;
