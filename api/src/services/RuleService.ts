import { Rule } from '@prisma/client';
import { RuleParamsQuery } from '../common/constants/paramsQuery';
import { RuleModel } from '../models/RuleModel';

export const RuleService = {
  getAllRules: async (params: RuleParamsQuery): Promise<{ rows: Rule[]; count: number }> => {
    const { rows, count } = await RuleModel.getAll(params);
    return { rows, count };
  },
  createRule: async (data: Rule): Promise<Rule> => {
    try {
      const { link, originalName } = data;

      return await RuleModel.createRule({
        link,
        originalName,
      });
    } catch (e) {
      throw e;
    }
  },
  deleteRule: async (id: number): Promise<Rule> => {
    try {
      return await RuleModel.deleteRule(id);
    } catch (e) {
      throw e;
    }
  },
};
