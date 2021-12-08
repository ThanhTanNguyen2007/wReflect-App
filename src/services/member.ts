import { addMemberToTeamType, setRoleMemberType, getListMembersType } from '../types';
import logger from '../logger';
import prisma from '../prisma';
import _ from 'lodash';

import { sendMail } from './nodemailer/sentMail';
import { Member } from '.prisma/client';

export const getListMembers = async (data: getListMembersType, userId?: number) => {
  try {
    const where = userId
      ? {
          OR: [
            {
              members: {
                some: {
                  userId,
                },
              },
            },
            {
              isPublic: true,
            },
          ],
        }
      : undefined;

    const team = await prisma.team.findFirst({
      where: {
        ...where,
        id: data.teamId,
      },
      select: {
        isPublic: true,
        members: true,
      },
    });

    if (!team) throw new Error('Team not found');

    const membersRoleOwner = <Member[]>[],
      membersRoleNormal = <Member[]>[];
    await Promise.all(
      team.members.map((member) => {
        if (member.isOwner) {
          membersRoleOwner.push(member);
        } else {
          membersRoleNormal.push(member);
        }
      }),
    );

    return team.members;
  } catch (error) {
    logger.error('Error at getListMembers Service');
    throw error;
  }
};

export const addMembersToTeam = async (assignedBy: string, data: addMemberToTeamType) => {
  try {
    const team = await prisma.team.findFirst({
      where: {
        ownerEmail: {
          has: assignedBy,
        },
        id: data.teamId,
      },
    });

    if (!team) throw new Error(`You are not the owner of Team ${data.teamId}`);

    const currentUsers = await prisma.user.findMany({
      where: {
        email: {
          in: data.emailUsers,
        },
      },
    });

    const currentMailsUser = currentUsers.map((user) => user.email);

    const success = [] as string[];
    const errors = [] as string[];
    const newEmail = _.filter(data.emailUsers, (email) => !currentMailsUser.includes(email));
    if (newEmail.length > 0) {
      await Promise.all(
        newEmail.map((email) => {
          sendMail(email, `Invite to team ${data.teamId}`, `Someone invite you to team ${team.name} - ${team.id}`);
          success.push(`We have sent email invite to ${email}`);
        }),
      );
    }
    if (currentUsers.length > 0) {
      for (let idx = 0; idx < currentUsers.length; idx++) {
        const member = await prisma.member.findUnique({
          where: {
            userId_teamId: {
              teamId: data.teamId,
              userId: currentUsers[idx].id,
            },
          },
        });
        if (member) {
          errors.push(`${currentUsers[idx].email} already exists in this team`);
        } else {
          await prisma.member.create({
            data: {
              assignedBy,
              userId: currentUsers[idx].id,
              teamId: data.teamId,
            },
          });
          prisma.team.update({
            where: {
              id: team.id,
            },
            data: {
              numOfMember: {
                increment: 1,
              },
            },
          });
          success.push(`${currentUsers[idx].email} added in this team`);
        }
      }
    }

    return {
      success,
      errors,
    };
  } catch (error) {
    logger.error('Error at addMemberToTeam');
    throw error;
  }
};

export const setRoleMember = async (ownerEmail: string, data: setRoleMemberType) => {
  try {
    const team = await prisma.team.findFirst({
      where: {
        ownerEmail: {
          has: ownerEmail,
        },
        id: data.teamId,
      },
    });

    if (!team) throw new Error(`You are not the owner of Team ${data.teamId}`);

    const member = await prisma.member.update({
      where: {
        userId_teamId: {
          teamId: data.teamId,
          userId: data.userId,
        },
      },
      data: {
        isOwner: data.isRoleAdmin,
      },
      include: {
        team: true,
        user: true,
      },
    });

    if (!member) throw new Error('Bad request');
    return member;
  } catch (error) {
    logger.error('Error at setRoleMember');
    throw error;
  }
};
