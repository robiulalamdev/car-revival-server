import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import randomstring from "randomstring";

import { IUser } from './auth.interface';
import { PrismaClient } from '@prisma/client';

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
    const result = await AuthService.create(req.body);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'We have sent you verification code. Please check your email!',
      data: result,
    });
  }
});


const sginin = catchAsync(async (req: Request, res: Response) => {
  const { token } = await AuthService.signin(req.body);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User signin successful!',
    token: token,
  });
});

export const AuthController = {
  create,
  sginin,
};
