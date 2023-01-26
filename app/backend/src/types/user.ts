export type TUserToken = {
  id: number,
  role: string,
  username: string,
};

export type TUser = {
  id: number,
  username: string,
  email: string,
  role: string,
};

type TUserdb = {
  password: string,
} & TUser;

export default TUserdb;
