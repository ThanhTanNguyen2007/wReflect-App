import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

const ProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    introduction: { type: GraphQLString },
    userId: { type: GraphQLInt },
    talents: { type: new GraphQLList(GraphQLString) },
    interests: { type: new GraphQLList(GraphQLString) },
    updatedAt: { type: GraphQLString },
  }),
});

export default ProfileType;
