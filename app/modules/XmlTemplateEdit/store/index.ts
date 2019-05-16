import gql from 'graphql-tag';

const MUTATION_UPDATE_XML_TEMPLATE = gql`
  mutation UpdateXmlTemplate($id: ID!, $name: String!, $xml: String!) {
    updateXmlTemplate(id: $id, name: $name, xml: $xml) {
      id
      name
      xml
      createdAt
      updatedAt
      templatesCount
    }
  }
`;

export { MUTATION_UPDATE_XML_TEMPLATE };