import gql from 'graphql-tag';

const MUTATION_CREATE_XML_TEMPLATE = gql`
  mutation CreateXmlTemplate($name: String!, $xml: String!, $description: String) {
    createXmlTemplate(name: $name, xml: $xml, description: $description) {
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

export { MUTATION_CREATE_XML_TEMPLATE };