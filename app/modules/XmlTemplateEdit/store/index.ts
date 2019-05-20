import gql from 'graphql-tag';

const MUTATION_UPDATE_XML_TEMPLATE = gql`
  mutation UpdateXmlTemplate($id: ID!, $name: String!, $xml: String!, $description: String) {
    updateXmlTemplate(id: $id, name: $name, xml: $xml, description: $description) {
      id
      name
      xml
      description
      createdAt
      updatedAt
      templatesCount
    }
  }
`;

export { MUTATION_UPDATE_XML_TEMPLATE };