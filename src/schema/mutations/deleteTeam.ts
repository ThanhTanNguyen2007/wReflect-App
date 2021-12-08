import { isOwnerTeam } from './../../services/team';
import { RequestWithUserInfo } from '../../types';
import { GraphQLInt } from 'graphql';

import { team } from '../../services';
import { TeamType } from '../types';

type argument = {
  teamId: number;
};

export default {
  type: TeamType,
  args: {
    teamId: { type: GraphQLInt },
  },
  resolve: async (_, { teamId }: argument, request: RequestWithUserInfo) => {
    try {
      const { email } = request.user;
      const isOwner = await isOwnerTeam(email, teamId);
      if (!isOwner) throw new Error(`You are not the owner of Team ${teamId}`);

      return await team.deleteTeam(email, teamId);
    } catch (error) {
      throw error;
    }
  },
};
