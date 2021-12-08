import { gql } from '@apollo/client';

const getListMembers = gql`
  query getListMembers($teamId: Int!) {
    members(teamId: $teamId) {
      userId
      teamId
      isOwner
      joinedAt
      assignedBy
      user {
        email
        name
        createAt
        updatedAt
        isAdmin
        status
        picture
      }
    }
  }
`;

export { getListMembers };
