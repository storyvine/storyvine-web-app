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

const MUTATION_UPDATE_CMS_VARIABLES_POSITION = gql`
  mutation UpdateCmsVariablesPosition($firstNodeId: ID!, $secondNodeId: ID!, $firstNodePosition: Int!, $secondNodePosition: Int!) {
    updateCmsVariablesPosition(firstNodeId: $firstNodeId, secondNodeId: $secondNodeId, firstNodePosition: $firstNodePosition, secondNodePosition: $secondNodePosition)
  }
`;

export { MUTATION_DELETE_CMS_VARIABLE, MUTATION_DELETE_USER_VARIABLE, MUTATION_UPDATE_CMS_VARIABLES_POSITION };