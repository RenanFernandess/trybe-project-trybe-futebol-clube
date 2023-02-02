import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors';
import Token from '../auth';
import { TOKEN_INVALID } from '../errors/messages';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;
  const token = new Token();
  if (!authorization) throw new HttpError(401, TOKEN_INVALID);
  const user = await token.Validate(authorization);
  req.body.user = user;
  next();
};

export default tokenValidate;
