import * as jwt from 'jsonwebtoken';
import IToken, { IUser } from '../interfaces';
import 'dotenv/config';
import HttpError from '../errors';
import { TOKEN_INVALID } from '../errors/messages';
import UserModel from '../models';

export default class Token implements IToken {
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;
  private _model: UserModel;

  constructor(model: UserModel) {
    this._model = model;
    this._secret = process.env.JWT_SECRET || '';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '2h',
    };
  }

  public create(user: Omit<IUser, 'password' | 'email'>): string {
    return jwt.sign(user, this._secret, this._options);
  }

  public async Validate(token: string): Promise<IUser> {
    const decoded = jwt.verify(token, this._secret) as jwt.JwtPayload;
    const { id } = decoded;
    const user = await this._model.findById(id);
    if (!user) {
      throw new HttpError(401, TOKEN_INVALID);
    }
    const { dataValues: { password: _password, ...userWithoutPassword } } = user;
    return userWithoutPassword;
  }
}
