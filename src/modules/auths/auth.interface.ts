export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};


export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};


export type IUserLogin = {
  email: string;
  password: string;
}
