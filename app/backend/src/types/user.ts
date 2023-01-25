export type TUserToken = {
  id: number,
  username: string,
  role: string,
};

export type TUser = {
  email: string,
} & TUserToken;

type TUserdb = {
  password: string,
} & TUser;

export default TUserdb;
