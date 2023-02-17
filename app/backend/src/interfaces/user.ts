import ILogin from './login';

export default interface IUser extends ILogin {
  id: number,
  username: string,
  role: string,
}
