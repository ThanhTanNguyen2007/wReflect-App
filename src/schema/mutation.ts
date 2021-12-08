import { GraphQLObjectType } from 'graphql';
// import { deleteTeam, createTeam } from './mutations';
import createTeam from './mutations/createTeam';
import updateTeam from './mutations/updateTeam';
import deleteTeam from './mutations/deleteTeam';

import addMember from './mutations/addMember';
import setRoleMember from './mutations/setRoleMember';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTeam,
    updateTeam,
    deleteTeam,
    addMember,
    setRoleMember,
  },
});

export default Mutation;
