import { updateProfileType } from './../types';
import prisma from '../prisma';
import logger from '../logger';

export const getUserProfile = async (userId: number) => {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId,
      },
      include: { User: true },
    });
    return userProfile;
  } catch (error) {
    logger.error('Error in getUserProfile service');
    throw error;
  }
};

export const updateUserProfile = async (userId: number, data: updateProfileType) => {
  try {
    const updatedProfile = await prisma.userProfile.update({
      where: {
        userId,
      },
      data: {
        ...data,
      },
      include: {
        User: true,
      },
    });
    return updatedProfile;
  } catch (error) {
    logger.error('Error in updateUserProfile');
  }
};
