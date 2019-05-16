import gql from 'graphql-tag';

const MUTATION_CREATE_XML_TEMPLATE = gql`
  mutation CreateXmlTemplate($name: String!, $xml: String!) {
    createXmlTemplate(name: $name, xml: $xml) {
      id
      name
      xml
      createdAt
      updatedAt
      templatesCount
    }
  }
`;

export { MUTATION_CREATE_XML_TEMPLATE };