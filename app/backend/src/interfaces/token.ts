import IUser from './user';

export default interface IToken {
  create(user: Omit<IUser, 'password' | 'email'>): string;
  Validate(token: string): Promise<IUser>;
}
