import * as Jwt from 'jsonwebtoken';
import { TUser, TUserToken } from '../types';
import IToken from '../interfaces';
import 'dotenv/config';
import User from '../database/models/User';
import HttpError from '../errors';

export default class Token implements IToken {
  private _secret: Jwt.Secret;
  private _options: Jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || '';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '2h',
    };
  }

  public create(user: TUserToken): string {
    return Jwt.sign({ data: user }, this._secret, this._options);
  }

  public async Validate(token: string): Promise<TUser> {
    const decoded = Jwt.verify(token, this._secret) as Jwt.JwtPayload;
    console.log(decoded);
    const { data: { id, email } } = decoded;
    console.log({ id, email });
    const user = await User.findOne({
      where: { id, email },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new HttpError(401, 'Expired or invalid token');
    }
    return user;
  }
}
