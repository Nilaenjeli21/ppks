import { PrismaClient } from '@prisma/client';
import { prismaLogger } from '../../common/config/logger';
import { inspect } from 'util';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on('error', (e) => {
  prismaLogger.error(e);
});

prisma.$on('warn', (e) => {
  prismaLogger.warn(e.message);
});

prisma.$on('info', (e) => {
  prismaLogger.info(e.message);
});

prisma.$on('query', (e) => {
  if (!e.query.includes('BEGIN') && !e.query.includes('COMMIT')) {
    prismaLogger.info(e.query);
  }
});

export default prisma;
