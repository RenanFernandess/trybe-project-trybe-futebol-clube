import { Request, Response } from 'express';
import LoginService from '../services';

export default class LoginController {
  constructor(private _loginService: LoginService) {}

  public login = async ({ body: { email, password } }: Request, res: Response) => {
    const token = await this._loginService.login({ email, password });
    return res.status(200).json({ token });
  };

  public validate = async (req: Request, res: Response) => {
    const { body: { user: { role } } } = req;
    return res.status(200).json({ role });
  };
}
