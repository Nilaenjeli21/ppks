import { Recommendation } from '@prisma/client';
import { RecommendationParamsQuery } from '../common/constants/paramsQuery';
import { RecommendationModel } from '../models/RecommendationModel';

export const RecommendationService = {
  getAllRecommendations: async (
    params: RecommendationParamsQuery
  ): Promise<{ rows: Recommendation[]; count: number }> => {
    const { rows, count } = await RecommendationModel.getAll(params);
    return { rows, count };
  },
  createRecommendation: async (data: Recommendation): Promise<Recommendation> => {
    try {
      const { ComplaintId, link, originalName } = data;

      return await RecommendationModel.createRecommendation({
        link,
        originalName,
        Complaint: { connect: { id: ComplaintId } },
      });
    } catch (e) {
      throw e;
    }
  },
};
