import gql from 'graphql-tag';

const MUTATION_TOGGLE_XML_TEMPLATE_STATE = gql`
  mutation ToggleXmlTemplateState($id: ID!, $state: String!) {
    toggleXmlTemplateState(id: $id, state: $state) {
      id
      name
      xml
      description
      state
      createdAt
      updatedAt
      templatesCount
      deletedAt
      disabledAt
    }
  }
`;

const MUTATION_DELETE_XML_TEMPLATE = gql`
  mutation DeleteXmlTemplate($id: ID!) {
    deleteXmlTemplate(id: $id)
  }
`;

export { MUTATION_TOGGLE_XML_TEMPLATE_STATE, MUTATION_DELETE_XML_TEMPLATE };