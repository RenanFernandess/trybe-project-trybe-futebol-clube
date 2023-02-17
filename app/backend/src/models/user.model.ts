import { IUser } from '../interfaces';
import User from '../database/models/User';

export default class UserModel {
  public findOne = (where: Partial<IUser>) => User.findOne({ where });

  public findById = (id: string) => User.findByPk(id);
}
