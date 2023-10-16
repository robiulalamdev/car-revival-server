
export type IUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  contactNo: string;
  verified?: boolean;
  otp?: string;
  dateOfBirth?: Date | null;
  gender?: string | null;
  about?: string | null;
  profession?: string | null;
}


export type IUserSigninResponse = {
  token: string;
};

export type IUserSignin = {
  email: string;
  password: string;
};
