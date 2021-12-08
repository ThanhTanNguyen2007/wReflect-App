import { getListDataType } from './../../types';
import { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt } from 'graphql';
import { TeamType } from '../types';
import { team } from '../../services';
import { RequestWithUserInfo } from '../../types';

export default {
  type: new GraphQLObjectType({
    name: 'FindListTeams',
    fields: {
      data: { type: new GraphQLList(TeamType) },
      total: { type: GraphQLInt },
    },
  }),
  args: {
    status: { type: GraphQLString },
    isGettingAll: { type: GraphQLBoolean },
    search: { type: GraphQLString },
    page: { type: GraphQLInt },
    size: { type: GraphQLInt },
  },
  resolve: async (_, args: getListDataType, request: RequestWithUserInfo) => {
    const { id, isAdmin } = request.user;
    const { status, isGettingAll, search, page, size } = args;
    const { data, total } = await team.getListTeams(
      isAdmin ? undefined : id,
      status,
      !!isGettingAll,
      page,
      size,
      search,
    );
    return { data, total };
  },
};
