import { Complaint, Prisma, Proof } from '@prisma/client';
import { ProofParamsQuery } from '../common/constants/paramsQuery';
import prisma from '../database/Dao/Database';

export interface ProofWithComplaint extends Proof {
  Complaint: Complaint;
}

export const ProofModel = {
  getAll: async (params: ProofParamsQuery): Promise<{ rows: Proof[]; count: number }> => {
    const where: Prisma.ProofWhereInput = {};

    const take = +params.perPage || undefined;
    const skip = +params.page * take || undefined;
    const count = await prisma.proof.count({ where });
    const rows = await prisma.proof.findMany({
      skip,
      take,
      orderBy: [{ id: 'desc' }],
      where,
      include: { Complaint: true },
    });

    return { rows, count };
  },

  createProof: async (data: Prisma.ProofCreateInput): Promise<ProofWithComplaint> => {
    return prisma.proof.create({ data, include: { Complaint: true } });
  },

  updateProof: async (id: number, data: Prisma.ProofUpdateInput): Promise<ProofWithComplaint> => {
    return prisma.proof.update({
      where: { id },
      data,
      include: { Complaint: true },
    });
  },

  deleteProof: async (id: number): Promise<Proof> => {
    try {
      // Check if the proof exists before attempting to delete
      const proof = await prisma.proof.findUnique({ where: { id } });

      if (!proof) {
        console.warn(`Proof with ID ${id} does not exist.`);
        return null; // or handle it in a way that fits your application's flow
      }

      // Delete the proof
      return await prisma.proof.delete({ where: { id } });
    } catch (error) {
      console.error(`Failed to delete proof with ID ${id}: ${error.message}`);
      throw error; // rethrow the error after logging it
    }
  },
};
