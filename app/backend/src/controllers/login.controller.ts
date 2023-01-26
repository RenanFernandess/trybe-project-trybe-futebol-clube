import { Request, Response } from 'express';
import HttpError from '../errors';
import LoginService from '../services';

export default class LoginController {
  constructor(private _loginService: LoginService) {}

  public async login({ body: { email, password } }: Request, res: Response) {
    try {
      const token = await this._loginService.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      if (error instanceof HttpError) {
        const { status, message } = error;
        return res.status(status).json({ message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async validate(req: Request, res: Response) {
    const { body: { user: { role } } } = req;
    return res.status(200).json({ role });
    return this._loginService;
  }
}
