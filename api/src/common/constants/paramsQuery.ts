import { ComplaintStatus } from '@prisma/client';

export interface paramsQuery {
  query?: string;
  page?: number;
  perPage?: number;
  id?: number;
}

export interface ComplaintParamsQuery extends paramsQuery {
  status?: ComplaintStatus;
  arrayStatus?: ComplaintStatus[];
  query?: string;
  name?: string;
}
export interface ProofParamsQuery extends paramsQuery {}
export interface RecommendationParamsQuery extends paramsQuery {}
export interface ApplogParamsQuery extends paramsQuery {}
export interface RuleParamsQuery extends paramsQuery {}
export interface UserParamsQuery extends paramsQuery {}
