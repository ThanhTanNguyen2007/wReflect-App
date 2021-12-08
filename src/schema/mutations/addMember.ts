import { GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';
import { RequestWithUserInfo, addMemberToTeamType } from '../../types';

import { member } from '../../services';

export default {
  type: new GraphQLObjectType({
    name: 'AddMemberStatus',
    fields: {
      success: { type: new GraphQLList(GraphQLString) },
      errors: { type: new GraphQLList(GraphQLString) },
    },
  }),
  args: {
    emailUsers: { type: new GraphQLList(GraphQLString) },
    teamId: { type: GraphQLInt },
  },
  resolve: async (_, args: addMemberToTeamType, request: RequestWithUserInfo) => {
    const { email } = request.user;
    return await member.addMembersToTeam(email, args);
  },
};
