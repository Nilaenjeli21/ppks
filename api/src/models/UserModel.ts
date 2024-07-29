import { Prisma, User } from '@prisma/client';
import prisma from '../database/Dao/Database';

export const UserModel = {
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
