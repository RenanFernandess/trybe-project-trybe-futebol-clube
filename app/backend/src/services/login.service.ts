import * as bcript from 'bcryptjs';
import User from '../database/models/User';
import Token from '../auth';
import HttpError from '../errors';
import { ILogin } from '../interfaces';

export default class LoginService {
  constructor(private _Token: Token) {}

  public async login({ email, password }: ILogin): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcript.compare(password, user.password))) {
      throw new HttpError(401, 'Incorrect email or password');
    }
    const { id, username, role } = user;
    return this._Token.create({ id, username, role });
  }
}
