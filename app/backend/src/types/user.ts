export type TUser = {
  id: number,
  username: string,
  role: string,
  email: string,
};

type TUserdb = {
  password: string,
} & TUser;

export default TUserdb;
