import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../auth/auth.interface';
import { ProfileService } from './profile.service';

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getSingle(req.user?.id);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  getSingle,
};
