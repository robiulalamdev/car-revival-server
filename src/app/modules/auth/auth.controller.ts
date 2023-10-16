import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import randomstring from "randomstring";

import { IUser } from './auth.interface';
import { PrismaClient } from '@prisma/client';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const create = catchAsync(async (req: Request, res: Response) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (isExist) {
    sendResponse<IUser>(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'Email Already in use!'
    });
  } else {
    req.body["otp"] = randomstring.generate({ length: 5, charset: "numeric" });
    const result = await AuthService.createUser(req.body);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'We have sent you verification code. Please check your email!',
      data: result,
    });
  }
});


const emailVerification = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    sendResponse<IUser>(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found!',
    });
  }

  else {
    if (user?.otp !== otp) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid OTP');
    }
    user.verified = true;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    const token = jwtHelpers.createToken(user,
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    res.send({
      message: "User Verified successfully",
      accessToken: token,
      status: 200,
    });
  }
});


const sginin = catchAsync(async (req: Request, res: Response) => {
  const { token } = await AuthService.signin(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successful!',
    accessToken: token,
  });
});


const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (req.body.email && !req.body.otp) {
    if (isExist && isExist.verified === true) {
      const otp = randomstring.generate({ length: 5, charset: "numeric" });
      const result = await prisma.user.update({
        where: {
          id: isExist.id,
        },
        data: {
          otp: otp
        },
      });
      sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'We have sent you verification code. Please check your email!',
        data: result,
      });

    } else {
      sendResponse<IUser>(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Account Not Verified Please Verify!'
      });
    }
  } else if (req.body.email && req.body.otp && !req.body.password) {
    if (isExist) {
      if (isExist.otp === req.body.otp) {
        sendResponse<IUser>(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'Change Your Password'
        });
      } else {
        sendResponse<IUser>(res, {
          success: true,
          statusCode: 201,
          message: 'OTP is incorrect'
        });
      }
    }
  } else if (req.body.password) {
    if (isExist) {
      const password = await bcrypt.hash(
        req.body.password,
        Number(config.bycrypt_salt_rounds)
      );

      const result = await prisma.user.update({
        where: {
          id: isExist.id,
        },
        data: {
          password: password
        },
      });
      sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Password Changed successfully'
      });
    }

  }

})


export const AuthController = {
  create,
  emailVerification,
  sginin,
  forgetPassword
};
