import { Order, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
const prisma = new PrismaClient();

const create = async (data: any): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAll = async (role: string, id: string): Promise<Order[]> => {
  if (role === 'admin') {
    const result = await prisma.order.findMany({});
    return result;
  } else if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
    });
    return result;
  }
  throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
};

const getSingle = async (
  orderId: string,
  role: string,
  id: string
): Promise<Order | null> => {
  console.log(id);
  if (role === 'admin') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return result;
  } else if (role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: id,
      },
    });
    return result;
  }
  throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
};

export const OrderService = {
  create,
  getAll,
  getSingle,
};
