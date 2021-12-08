import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

import { TeamType } from '../types';
import { team } from '../../services';
import { updateTeamType } from '../../types';

export default {
  type: TeamType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: {
      type: GraphQLString,
    },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    status: { type: GraphQLString },
    picture: { type: GraphQLString },
  },
  resolve: async (_, args: updateTeamType) => {
    return await team.updateTeam(args);
  },
};
