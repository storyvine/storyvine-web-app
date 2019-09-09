import gql from 'graphql-tag';

const QUERY_USER_VARIABLE = gql`
  query GlobalUserVariable($id: ID!) {
    globalUserVariable(id: $id) {
      id
      key
      label
      position
      screen
      characterLimit
    }
  }
`;

const MUTATION_UPDATE_USER_VARIABLE = gql`
  mutation UpdateUserVariable($id: ID!, $label: String!, $key: String!, $screen: String!, $position: String!, $characterLimit: String!) {
    updateUserVariable(id: $id, label: $label, key: $key, screen: $screen, position: $position, characterLimit: $characterLimit) {
      id
      key
      label
      position
      screen
      characterLimit
    }
  }
`;

export { QUERY_USER_VARIABLE, MUTATION_UPDATE_USER_VARIABLE };