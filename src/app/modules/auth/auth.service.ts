import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser, IUserSignin, IUserSigninResponse } from './auth.interface';
import { selectUserFields } from './auth.utils';
const prisma = new PrismaClient();

const createUser = async (data: User): Promise<IUser> => {
  console.log(data)
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data
  });
  return result;
};

const signin = async (data: IUserSignin): Promise<IUserSigninResponse> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const isPasswordMatched = await bcrypt.compare(
    data.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const token = jwtHelpers.createToken(
    isUserExist,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { token };
};

export const AuthService = {
  createUser,
  signin,
};
