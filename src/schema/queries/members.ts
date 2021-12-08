import { getListMembersType } from './../../types';
import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';
import { MemberType } from '../types';
import { member } from '../../services';
import { RequestWithUserInfo } from '../../types';

export default {
  type: new GraphQLList(MemberType),
  args: {
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_, args: getListMembersType, request: RequestWithUserInfo) => {
    const { id, isAdmin } = request.user;
    return await member.getListMembers(args, isAdmin ? undefined : id);
  },
};
