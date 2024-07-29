import { Prisma, Recommendation } from '@prisma/client';
import { RecommendationParamsQuery } from '../common/constants/paramsQuery';
import prisma from '../database/Dao/Database';

export const RecommendationModel = {
  getAll: async (
    params: RecommendationParamsQuery
  ): Promise<{ rows: Recommendation[]; count: number }> => {
    const where: Prisma.RecommendationWhereInput = {};

    const take = +params.perPage || undefined;
    const skip = +params.page * take || undefined;
    const count = await prisma.recommendation.count({ where });
    const rows = await prisma.recommendation.findMany({
      skip,
      take,
      orderBy: [{ id: 'desc' }],
      where,
      include: { Complaint: true },
    });

    return { rows, count };
  },
  createRecommendation: async (data: Prisma.RecommendationCreateInput): Promise<Recommendation> => {
    return prisma.recommendation.create({ data });
  },
  deleteRecommendation: async (id: number): Promise<Prisma.BatchPayload> => {
    return prisma.recommendation.deleteMany({ where: { ComplaintId: id } });
  },
};
