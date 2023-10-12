import { Category, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getSingle = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const getAll = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};

const update = async (
  id: string,
  Payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: Payload,
  });

  return result;
};

const deleteSingle = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const CategoryService = {
  create,
  getSingle,
  getAll,
  update,
  deleteSingle,
};
