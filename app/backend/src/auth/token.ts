import * as jwt from 'jsonwebtoken';
import { TUser, TUserToken } from '../types';
import IToken from '../interfaces';
import 'dotenv/config';
import User from '../database/models/User';
import HttpError from '../errors';
import { TOKEN_INVALID } from '../errors/messages';

export default class Token implements IToken {
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || '';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '2h',
    };
  }

  public create(user: TUserToken): string {
    return jwt.sign(user, this._secret, this._options);
  }

  public async Validate(token: string): Promise<TUser> {
    const decoded = jwt.verify(token, this._secret) as jwt.JwtPayload;
    const { id } = decoded;
    const user = await User.findByPk(id);
    if (!user) {
      throw new HttpError(401, TOKEN_INVALID);
    }
    const { dataValues: { password: _password, ...userWithoutPassword } } = user;
    return userWithoutPassword;
  }
}
