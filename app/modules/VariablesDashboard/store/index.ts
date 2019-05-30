import gql from 'graphql-tag';

const MUTATION_DELETE_CMS_VARIABLE = gql`
  mutation DeleteCmsVariable($id: ID!) {
    deleteCmsVariable(id: $id)
  }
`;

const MUTATION_DELETE_USER_VARIABLE = gql`
  mutation DeleteUserVariable($id: ID!) {
    deleteUserVariable(id: $id)
  }
`;

export { MUTATION_DELETE_CMS_VARIABLE, MUTATION_DELETE_USER_VARIABLE };