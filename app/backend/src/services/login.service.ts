import * as bcript from 'bcryptjs';
import TLogin from '../types';
import User from '../database/models/User';
import Token from '../auth';
import HttpError from '../errors';

export default class LoginService {
  constructor(private _Token: Token) {}

  public async login({ email, password }: TLogin): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcript.compare(password, user.password))) {
      throw new HttpError(401, 'Incorrect email or password');
    }
    const { password: _password, ...userFields } = user;
    return this._Token.create(userFields);
  }
}
