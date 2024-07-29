import { Applog } from '@prisma/client';
import { ApplogParamsQuery } from '../common/constants/paramsQuery';
import { ApplogModel } from '../models/ApplogModel';

export const ApplogService = {
  getAllApplogs: async (params: ApplogParamsQuery): Promise<{ rows: Applog[]; count: number }> => {
    const { rows, count } = await ApplogModel.getAll(params);
    return { rows, count };
  },
  createApplog: async (data: { UserId: number; message: string }): Promise<Applog> => {
    try {
      const { UserId, message } = data;

      return await ApplogModel.createApplog({
        message,
        User: { connect: { id: UserId } },
      });
    } catch (e) {
      throw e;
    }
  },
};
