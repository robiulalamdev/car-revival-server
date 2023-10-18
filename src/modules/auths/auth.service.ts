/* eslint-disable consistent-type-definitions */
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { ILoginUserResponse, IRefreshTokenResponse, IUserLogin } from './auth.interface';
import bcrypt from 'bcrypt';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const newUser = new User(user);
  const createdUser = await newUser.save();
  return createdUser;
};



const authLogin = async (payload: IUserLogin): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email: email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email: isUserExist?.email, role: isUserExist?.role, userId: isUserExist?._id, name: isUserExist?.name, image: isUserExist?.image },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findById({ _id: userId });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authService = {
  createUser,
  authLogin,
  refreshToken
};
