import { Prisma, Applog } from '@prisma/client';
import { ApplogParamsQuery } from '../common/constants/paramsQuery';
import prisma from '../database/Dao/Database';

export const ApplogModel = {
  getAll: async (params: ApplogParamsQuery): Promise<{ rows: Applog[]; count: number }> => {
    const where: Prisma.ApplogWhereInput = {};

    const take = +params.perPage || undefined;
    const skip = +params.page * take || undefined;
    const count = await prisma.applog.count({ where });
    const rows = await prisma.applog.findMany({
      skip,
      take,
      orderBy: [{ id: 'desc' }],
      where,
      include: { User: { select: { name: true, email: true } } },
    });

    return { rows, count };
  },
  createApplog: async (data: Prisma.ApplogCreateInput): Promise<Applog> => {
    return prisma.applog.create({ data });
  },
};
