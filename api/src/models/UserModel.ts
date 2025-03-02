import { Prisma, User } from '@prisma/client';
import prisma from '../database/Dao/Database';
import { UserParamsQuery } from '../common/constants/paramsQuery';


export const UserModel = {
  getAll: async (params: UserParamsQuery): Promise<{ rows: User[]; count: number }> => {
    const where: Prisma.UserWhereInput = {};

    const take = +params.perPage || undefined;
    const skip = +params.page * take || undefined;
    const count = await prisma.user.count({ where });
    const rows = await prisma.user.findMany({
      skip,
      take,
      orderBy: [{ id: 'desc' }],
      where,
  });

    return { rows, count };
  },
  getByEmail: async (email: string): Promise<User> => {
    return await prisma.user.findFirst({
      where: { email },
    });
  },
  getById: async (id: number): Promise<User> => {
    return await prisma.user.findFirst({
      where: { id },
    });
  },
  createUser: async (data: Prisma.UserCreateInput): Promise<User> => {
    const user = await prisma.user.create({ data });
    delete user.password;
    return user;
  },
  countByEmail: (email: string, notId?: number): Promise<number> => {
    const where = notId ? { email, id: { not: notId } } : { email };
    return prisma.user.count({ where });
  },
  update: async (id: number, data: Prisma.UserUpdateInput): Promise<User> => {
    const user = await prisma.user.update({ where: { id }, data });
    delete user.password;
    return user;
  },
};
