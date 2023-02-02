import 'express-async-errors';
import { Request, Response } from 'express';
import HttpError from '../errors';
import LoginService from '../services';

export default class LoginController {
  constructor(private _loginService: LoginService) {}

  public async login({ body: { email, password } }: Request, res: Response) {
    throw new HttpError(401, 'Incorrect email or password');
    const token = await this._loginService.login({ email, password });
    return res.status(200).json({ token });
  }

  public validate = async (req: Request, res: Response) => {
    const { body: { user: { role } } } = req;
    return res.status(200).json({ role });
  };
}
