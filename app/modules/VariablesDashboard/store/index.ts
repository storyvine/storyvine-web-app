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

const MUTATION_DELETE_CMS_VARIABLE = gql`
  mutation DeleteCmsVariable($id: ID!) {
    deleteCmsVariable(id: $id)
  }
`;

export { QUERY_GLOBAL_USER_VARIABLES, MUTATION_DELETE_CMS_VARIABLE };