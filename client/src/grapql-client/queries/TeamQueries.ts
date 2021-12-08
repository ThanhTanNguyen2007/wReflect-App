import { gql } from '@apollo/client';

const getTeams = gql`
  query teams($status: String, $isGettingAll: Boolean, $search: String, $page: Int, $size: Int) {
    teams(status: $status, isGettingAll: $isGettingAll, search: $search, page: $page, size: $size) {
      data {
        id
        name
        description
        picture
        members {
          userId
          isOwner
          userId
          user {
            id
            email
            picture
          }
        }
      }
      total
    }
  }
`;

export { getTeams };
