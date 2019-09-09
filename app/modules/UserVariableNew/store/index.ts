import gql from 'graphql-tag';

const MUTATION_CREATE_USER_VARIABLE = gql`
  mutation CreateUserVariable($label: String!, $key: String!, $screen: String!, $position: String!, $characterLimit: String!) {
    createUserVariable(label: $label, key: $key, screen: $screen, position: $position, characterLimit: $characterLimit) {
      id
      key
      label
      position
      screen
      characterLimit
    }
  }
`;

export { MUTATION_CREATE_USER_VARIABLE };