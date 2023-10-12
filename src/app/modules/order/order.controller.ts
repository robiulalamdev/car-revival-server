import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const create = catchAsync(async (req: Request, res: Response) => {
  req.body['userId'] = req?.user?.id;
  const result = await OrderService.create(req.body);
  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order Create successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const role = req?.user?.role;
  const result = await OrderService.getAll(role, req.user?.id);
  sendResponse<Order[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const role = req?.user?.role;
  const result = await OrderService.getSingle(
    req.params.orderId,
    role,
    req.user?.id
  );
  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  create,
  getAll,
  getSingle,
};
