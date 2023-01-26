import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import HttpError from '../errors';
import Token from '../auth';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;
  const token = new Token();
  try {
    if (!authorization) throw new HttpError(401, 'Expired or invalid token');
    const user = await token.Validate(authorization);
    req.body.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    if (error instanceof HttpError) {
      const { status, message } = error;
      return res.status(status).json({ message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default tokenValidate;
