import logger from '../logger';
import prisma from './../prisma';
import { createTeamType, RequestWithUserInfo, updateTeamType } from '../types';
import { Team } from '.prisma/client';

export const getListTeams = async (
  userId?: number,
  status?: string,
  isGettingAll = false,
  page = 1,
  size = 8,
  search = '',
) => {
  try {
    const where = userId
      ? {
          members: {
            some: {
              userId,
            },
          },
        }
      : undefined;

    const data = await prisma.team.findMany({
      where: {
        ...where,
        name: {
          contains: search,
          mode: 'insensitive',
        },
        status: {
          contains: status,
          mode: 'insensitive',
        },
      },
      ...(!isGettingAll && { skip: (page - 1) * size }),
      ...(!isGettingAll && { take: size }),
      include: {
        members: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.team.count({
      where: {
        ...where,
        name: {
          contains: search,
          mode: 'insensitive',
        },
        status: {
          contains: status,
          mode: 'insensitive',
        },
      },
    });

    return {
      data,
      total,
    };
  } catch (error) {
    logger.error('Error in getListTeams service');
    throw error;
  }
};

export const findTeam = async (teamId: number, userId?: number) => {
  try {
    const where = userId
      ? {
          id: teamId,
          members: {
            some: {
              userId,
            },
          },
        }
      : undefined;
    const team = await prisma.team.findFirst({
      where: {
        ...where,
      },
    });

    return team;
  } catch (error) {
    logger.error('Error in findTeam service');
    throw error;
  }
};

export const createTeam = async (request: RequestWithUserInfo, data: createTeamType) => {
  try {
    const { email, id } = request.user;

    const startDate = data.startDate ? new Date(data.startDate) : new Date();
    const endDate = data.endDate ? new Date(data.endDate) : new Date();

    const newTeam = await prisma.team.create({
      data: { ...data, startDate, endDate, ownerEmail: [email] },
    });

    await prisma.member.create({
      data: {
        isOwner: true,
        userId: id,
        teamId: newTeam.id,
      },
    });

    return newTeam;
  } catch (error) {
    logger.error('Error in createTeam');
    throw error;
  }
};

export const updateTeam = async (data: updateTeamType): Promise<Team | null> => {
  try {
    const newTeam = prisma.team.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });
    return newTeam;
  } catch (error) {
    logger.error('Error in updateTeam service');
    throw error;
  }
};

export const deleteTeam = async (ownerEmail: string, teamId: number) => {
  try {
    return await prisma.team.delete({
      where: {
        id: teamId,
      },
    });
  } catch (error) {
    logger.error('Error in deleteTeam service');
    throw error;
  }
};

export const isOwnerTeam = async (email: string, teamId: number) => {
  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
      ownerEmail: {
        has: email,
      },
    },
  });
  return team ? true : false;
};
