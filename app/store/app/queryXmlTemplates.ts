import gql from 'graphql-tag';

const QUERY_XML_TEMPLATES = gql`
  query {
    xmlTemplates {
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

export { QUERY_XML_TEMPLATES };