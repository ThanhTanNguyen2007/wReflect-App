import { GraphQLInt } from 'graphql';
import { UserType } from '../types';
import { user } from '../../services';

export default {
  type: UserType,
  args: {
    userId: { type: GraphQLInt },
  },
  resolve: async (_, args: { userId: number }) => {
    return await user.getUserById(args.userId);
  },
};
