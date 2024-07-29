import { Complaint, ComplaintStatus, Prisma } from '@prisma/client';
import prisma from '../database/Dao/Database';
import { ComplaintParamsQuery } from '../common/constants/paramsQuery';

export const ComplaintModel = {
  getById: async (id: number): Promise<Complaint> => {
    return await prisma.complaint.findFirst({
      where: { id },
    });
  },
  createComplaint: async (data: Prisma.ComplaintCreateInput): Promise<Complaint> => {
    return prisma.complaint.create({ data });
  },
  getAll: async (params: ComplaintParamsQuery): Promise<{ rows: Complaint[]; count: number }> => {
    const where: Prisma.ComplaintWhereInput = {};

    if (params && params.status) {
      where.status = params.status;
    }

    if (params && params.arrayStatus) {
      where.status = { in: params.arrayStatus };
    }

    if (params && params.id) {
      where.id = +params.id;
    }

    if (params && params.name) {
      where.name = { contains: params.name, mode: 'insensitive' };
    }

    const take = +params.perPage || undefined;
    const skip = +params.page * take || undefined;
    const count = await prisma.complaint.count({ where });
    const rows = await prisma.complaint.findMany({
      skip,
      take,
      orderBy: [{ id: 'desc' }],
      where,
      include: {
        Recommendation: true,
      },
    });

    return { rows, count };
  },
  deleteComplaint: async (id: number): Promise<Complaint> => {
    return prisma.complaint.delete({ where: { id } });
  },
  updateCompaint: async (id: number, data: Prisma.ComplaintUpdateInput): Promise<Complaint> => {
    return prisma.complaint.update({ where: { id }, data });
  },
  countComplaintbyStatus: async (): Promise<{
    open: number;
    inProgress: number;
    closed: number;
  }> => {
    const open = await prisma.complaint.count({ where: { status: ComplaintStatus.OPEN } });
    const inProgress = await prisma.complaint.count({
      where: { status: ComplaintStatus.IN_PROGRESS },
    });
    const closed = await prisma.complaint.count({
      where: { status: { in: [ComplaintStatus.CLOSED, ComplaintStatus.REJECTED] } },
    });
    return { open, inProgress, closed };
  },
};
