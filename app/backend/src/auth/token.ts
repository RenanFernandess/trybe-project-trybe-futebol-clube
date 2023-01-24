import * as Jwt from 'jsonwebtoken';
import { TUser } from '../types';
import IToken from '../interfaces';
import 'dotenv/config';

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

  public create(user: TUser): string {
    return Jwt.sign({ data: user }, this._secret, this._options);
  }

  public Validate(token: string): void {
    Jwt.verify(token, this._secret);
    // Not Implemented
  }
}
