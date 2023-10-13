export type IUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  contactNo: string;
  address: string;
};

export type IUserSigninResponse = {
  token: string;
};

export type IUserSignin = {
  email: string;
  password: string;
};
