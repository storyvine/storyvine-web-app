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
      disabledAt
      deletedAt
    }
  }
`;

export { QUERY_XML_TEMPLATES };