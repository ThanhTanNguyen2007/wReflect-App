import { getListDataType } from './../../types';
import { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt } from 'graphql';
import { UserType } from '../types';
import { user } from '../../services';
import { RequestWithUserInfo } from '../../types';

export default {
  type: new GraphQLObjectType({
    name: 'GetListUsers',
    fields: {
      data: { type: new GraphQLList(UserType) },
      total: { type: GraphQLInt },
    },
  }),
  args: {
    isGettingAll: { type: GraphQLBoolean },
    search: { type: GraphQLString },
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
  },
  resolve: async (_, args: getListDataType, request: RequestWithUserInfo) => {
    const { isAdmin } = request.user;
    if (!isAdmin) throw new Error('User dont have permission');
    const { isGettingAll, search, page, size } = args;
    const { data, total } = await user.getListUsers(search, !!isGettingAll, page, size);
    return { data, total };
  },
};
