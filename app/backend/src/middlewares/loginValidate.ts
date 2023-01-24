import { NextFunction, Request, Response } from 'express';
import checkLogin from './schemas';

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { body: { email, password } } = req;
  const { error } = checkLogin.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default loginValidate;
