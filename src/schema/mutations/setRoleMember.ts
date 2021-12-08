import { GraphQLInt, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { MemberType } from '../types';
import { RequestWithUserInfo, setRoleMemberType } from '../../types';

import { member } from '../../services';

export default {
  type: MemberType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    teamId: { type: new GraphQLNonNull(GraphQLInt) },
    isRoleAdmin: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (_, args: setRoleMemberType, request: RequestWithUserInfo) => {
    const { email } = request.user;
    return await member.setRoleMember(email, args);
  },
};
