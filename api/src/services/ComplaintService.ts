import { Complaint, ComplaintStatus, Prisma } from '@prisma/client';
import { ComplaintModel } from '../models/ComplaintModel';
import { ComplaintParamsQuery } from '../common/constants/paramsQuery';
import { RecommendationModel } from '../models/RecommendationModel';
import { ProofModel } from '../models/ProofModel';

export const ComplaintService = {
  createComplaint: async (data: Complaint): Promise<Complaint> => {
    try {
      const { name, major, program, position, description, contact, reporter, link, reportDate } = data;

      return await ComplaintModel.createComplaint({
        name,
        major,
        program,
        position,
        status: ComplaintStatus.OPEN,
        description,
        contact,
        reporter,
        link,
        reportDate,
      });
    } catch (e) {
      throw e;
    }
  },
  getAllComplaints: async (
    params: ComplaintParamsQuery
  ): Promise<{ rows: Complaint[]; count: number }> => {
    const { rows, count } = await ComplaintModel.getAll(params);
    return { rows, count };
  },
  deleteComplaint: async (id: number): Promise<Complaint> => {
    await ProofModel.deleteProof(id);
    await RecommendationModel.deleteRecommendation(id);
    return await ComplaintModel.deleteComplaint(id);
  },
  confirmComplaint: async (id: number): Promise<Complaint> => {
    return await ComplaintModel.updateCompaint(id, { status: ComplaintStatus.IN_PROGRESS });
  },
  countAllComplaintbyStatus: async (): Promise<{
    open: number;
    inProgress: number;
    closed: number;
  }> => {
    const { open, inProgress, closed } = await ComplaintModel.countComplaintbyStatus();
    return { open, inProgress, closed };
  },
  rejectComplaint: async (id: number): Promise<Complaint> => {
    return await ComplaintModel.updateCompaint(id, { status: ComplaintStatus.REJECTED });
  },
  closeComplaint: async (
    id: number,
    data: Prisma.RecommendationCreateInput
  ): Promise<Complaint> => {
    return await ComplaintModel.updateCompaint(id, {
      status: ComplaintStatus.CLOSED,
      Recommendation: {
        create: {
          link: data.link,
          originalName: data.originalName,
        },
      },
    });
  },
};
