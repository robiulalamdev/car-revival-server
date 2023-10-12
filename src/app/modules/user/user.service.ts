import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { IUser } from '../auth/auth.interface';
import { selectUserFields } from '../auth/auth.utils';
const prisma = new PrismaClient();

const getSingle = async (id: string): Promise<IUser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: selectUserFields(),
  });
  return result;
};

const getAll = async (): Promise<IUser[]> => {
  const result = await prisma.user.findMany({
    select: selectUserFields(),
  });
  return result;
};

const update = async (id: string, Payload: Partial<User>): Promise<IUser> => {
  if (Payload.password) {
    Payload.password = await bcrypt.hash(
      Payload.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: Payload,
    select: selectUserFields(),
  });

  return result;
};

const deleteSingle = async (id: string): Promise<IUser> => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
    select: selectUserFields(),
  });
  return result;
};

export const UserService = {
  getSingle,
  getAll,
  update,
  deleteSingle,
};
