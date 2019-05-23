import gql from 'graphql-tag';

const QUERY_GLOBAL_USER_VARIABLES = gql`
  query GlobalUserVariables {
    globalUserVariables {
      id
      key
      label
      position
      screen
      characterLimit
    }
  }
  `;

export { QUERY_GLOBAL_USER_VARIABLES };