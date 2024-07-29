import { Prisma, Rule } from '@prisma/client';
import { RuleParamsQuery } from '../common/constants/paramsQuery';
import prisma from '../database/Dao/Database';

export const RuleModel = {
  getAll: async (params: RuleParamsQuery): Promise<{ rows: Rule[]; count: number }> => {
    const where: Prisma.RuleWhereInput = {};

    const take = +params.perPage || undefined;
    const skip = +params.page * take || undefined;
    const count = await prisma.rule.count({ where });
    const rows = await prisma.rule.findMany({
      skip,
      take,
      orderBy: [{ id: 'desc' }],
      where,
    });

    return { rows, count };
  },
  createRule: async (data: Prisma.RuleCreateInput): Promise<Rule> => {
    return prisma.rule.create({ data });
  },
  deleteRule: async (id: number): Promise<Rule> => {
    return prisma.rule.delete({ where: { id } });
  },
};
