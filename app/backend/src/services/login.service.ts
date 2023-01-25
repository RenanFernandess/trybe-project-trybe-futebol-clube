import * as bcript from 'bcryptjs';
import TLogin, { TUserdb } from '../types';
import User from '../database/models/User';
import Token from '../auth';

export default class Login {
  declare user: (TUserdb | null);
  private _Token: Token;
  constructor(token: Token) {
    this._Token = token;
  }

  public async login({ email, password }: TLogin): Promise<string> {
    this.user = await User.findOne({ where: { email } });
    if (!this.user || await !bcript.compare(password, this.user.password)) {
      const error = new Error('Incorrect email or password');
      // status http 401
      throw error;
    }
    const { password: _password, ...user } = this.user;
    return this._Token.create(user);
  }
}
