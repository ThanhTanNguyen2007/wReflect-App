import { PrismaClient } from '@prisma/client';
import logger from './logger';
const prisma = new PrismaClient();

const testConnection = async () => {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    logger.info(`DB connection avaiable`);
  } catch (err) {
    logger.error(`DB connection not avaiable`);
    throw err;
  }
};

testConnection();

export default prisma;
