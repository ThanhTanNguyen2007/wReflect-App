import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList } from 'graphql';
import { user } from '../../services';
import { TeamType, UserType } from '.';

const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    isOwner: { type: GraphQLBoolean },
    userId: { type: GraphQLInt },
    teamId: { type: GraphQLInt },
    joinedAt: { type: GraphQLString },
    assignedBy: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (_) => {
        return await user.getUserById(_.userId);
      },
    },
    team: { type: TeamType },
  }),
});

export default MemberType;
