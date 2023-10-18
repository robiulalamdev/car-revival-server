import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';
import { User } from '../users/user.model';
import { IUser } from '../users/user.interface';
import catchAsync from '../../shared/catchAsync';
import { authService } from './auth.service';
import randomstring from "randomstring";
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

const create = catchAsync(async (req: Request, res: Response) => {

  const isExist = await User.findOne({ email: req.body.email })
  if (isExist) {
    sendResponse<IUser>(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'Email Already in use!'
    });
  } else {
    req.body["otp"] = randomstring.generate({ length: 5, charset: "numeric" });
    const result = await authService.createUser(req.body);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'We have sent you verification code. Please check your email!',
      data: result,
    });
  }
});


const emailVerification = catchAsync(async (req: Request, res: Response) => {
  const { otp, email } = req.body;
  const user = await User.findOne({ email: email })
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
    const result = await User.findOneAndUpdate({ _id: user._id }, user, { new: true });
    const token = jwtHelpers.createToken({ email: result?.email, role: result?.role, userId: result?._id, name: result?.name, image: result?.image },
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


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body;
    const result = await authService.authLogin(loginData);
    const { refreshToken, ...others } = result;
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      data: others,
    });
  } catch (error) {
    next(error)
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    const result = await authService.refreshToken(refreshToken);

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'New access token generated successfully !',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};


const getAuthInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = (req as any).user
    const user = await User.findOne({ _id: userId })
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'User info get successfully !',
      data: user,
    });

  } catch (error) {
    next(error)
  }
}


const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const isExist = await User.findOne({ email: req.body.email })

  if (req.body.email && !req.body.otp) {
    if (isExist && isExist.verified === true) {
      const otp = randomstring.generate({ length: 5, charset: "numeric" });
      const result = await User.findOneAndUpdate({ _id: isExist._id }, { otp: otp });
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
      await User.findOneAndUpdate({ _id: isExist._id }, { password: password });
      sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Password Changed successfully'
      });
    }
  }
})

export const authController = {
  create,
  loginUser,
  emailVerification,
  getAuthInfo,
  refreshToken,
  forgetPassword
};
