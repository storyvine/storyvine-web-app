import gql from 'graphql-tag';

const MUTATION_TOGGLE_TEMPLATE_STATE = gql`
  mutation ToggleXmlTemplateState($id: ID!, $state: String!) {
    toggleXmlTemplateState(id: $id, state: $state) {
      id
      name
      xml
      description
      createdAt
      updatedAt
      templatesCount
      deletedAt
      disabledAt
    }
  }
`;

export { MUTATION_TOGGLE_TEMPLATE_STATE };