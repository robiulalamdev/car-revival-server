import { PrismaClient } from '@prisma/client';
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

export const ProfileService = {
  getSingle,
};
