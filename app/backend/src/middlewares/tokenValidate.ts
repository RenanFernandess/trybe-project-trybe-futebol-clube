import { NextFunction, Request, Response } from 'express';
import Token from '../auth';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { headers: { authorization } } = req;
  const token = new Token();
  try {
    if (!authorization) throw new Error();
    const user = await token.Validate(authorization);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default tokenValidate;
