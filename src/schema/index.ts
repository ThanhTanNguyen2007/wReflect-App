import { GraphQLSchema } from 'graphql';

import RootQuery from './rootQuery';
import Mutation from './mutation';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
