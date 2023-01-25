import { TUser, TUserToken } from '../types';

export default interface IToken {
  create(user: TUserToken): string;
  Validate(token: string): Promise<TUser>;
}
