import { TUser } from '../types';

export default interface IToken {
  create(user: TUser): string;
  Validate(token: string): void;
}
