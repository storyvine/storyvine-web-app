import gql from 'graphql-tag';

const MUTATION_DELETE_CMS_VARIABLE = gql`
  mutation DeleteCmsVariable($id: ID!) {
    deleteCmsVariable(id: $id)
  }
`;

export { MUTATION_DELETE_CMS_VARIABLE };