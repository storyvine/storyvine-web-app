import gql from 'graphql-tag';

const MUTATION_DELETE_XML_TEMPLATE = gql`
  mutation DeleteXmlTemplate($id: ID!) {
    deleteXmlTemplate(id: $id)
  }
`;

export { MUTATION_DELETE_XML_TEMPLATE };