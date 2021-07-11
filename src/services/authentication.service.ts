import express from 'express';
import { createErrMsg } from './response-template.service';
import { TOKEN_SECRET } from '../keys';
import jwt from 'jsonwebtoken';

export const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      res.status(401).send(createErrMsg(401, 'Missing authorization header'));
      return;
    }
    const authHeaderComponents = authHeader.split(' ');
    if (authHeaderComponents.length !== 2) {
      res.status(401).send(createErrMsg(401, 'Invalid authorization header'));
      return;
    }
    const token = authHeaderComponents[1];
    const tokenComponents = token.split('.');
    if (tokenComponents.length !== 3) {
      res.status(401).send(createErrMsg(401, 'Invalid token format'));
      return;
    }
    const tokenSecret = process.env.TOKEN_SECRET ?? TOKEN_SECRET;
    const decode = jwt.verify(token, tokenSecret);

    next();
  } catch (err) {
    res.status(500).send(createErrMsg(500, 'Internal Server Error'));
  }
};
