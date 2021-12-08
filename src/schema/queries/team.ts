import { RequestWithUserInfo } from './../../types';
import { GraphQLInt } from 'graphql';
import { TeamType } from '../types';
import { team } from '../../services';

type argument = {
  teamId: number;
};

export default {
  type: TeamType,
  args: {
    teamId: {
      type: GraphQLInt,
    },
  },
  resolve: async (_, args: argument, request: RequestWithUserInfo) => {
    const { id, isAdmin } = request.user;
    return await team.findTeam(args.teamId, isAdmin ? undefined : id);
  },
};
