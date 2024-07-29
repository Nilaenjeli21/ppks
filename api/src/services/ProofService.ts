import { Proof, Prisma } from '@prisma/client';
import { ProofParamsQuery } from '../common/constants/paramsQuery';
import { ProofModel, ProofWithComplaint } from '../models/ProofModel';

export const ProofService = {
  getAllProofs: async (params: ProofParamsQuery): Promise<{ rows: Proof[]; count: number }> => {
    const { rows, count } = await ProofModel.getAll(params);
    return { rows, count };
  },

  createProof: async (data: Proof): Promise<ProofWithComplaint> => {
    try {
      const { ComplaintId, link, chronology } = data;

      return await ProofModel.createProof({
        link,
        Complaint: { connect: { id: ComplaintId } },
        chronology,
      });
    } catch (e) {
      throw e;
    }
  },

  updateProof: async (id: number, data: Partial<Proof>): Promise<ProofWithComplaint> => {
    try {
      const updatedData: Prisma.ProofUpdateInput = {
        link: data.link,
        chronology: data.chronology,
        Complaint: { connect: { id: data.ComplaintId } },
      };

      return await ProofModel.updateProof(id, updatedData);
    } catch (e) {
      throw e;
    }
  },

  deleteProof: async (id: number): Promise<void> => {
    try {
      await ProofModel.deleteProof(id);
    } catch (e) {
      throw e;
    }
  },
};