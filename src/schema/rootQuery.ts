import { GraphQLObjectType } from 'graphql';

import team from './queries/team';
import teams from './queries/teams';
import users from './queries/users';
import user from './queries/user';
import members from './queries/members';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    team,
    teams,
    users,
    user,
    members,
  },
});

export default RootQuery;
