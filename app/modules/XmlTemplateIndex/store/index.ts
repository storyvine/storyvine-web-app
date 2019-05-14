import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const getXmlTemplates = gql`
  query {
    xmlTemplates {
      id
      name
      xml
      createdAt
      updatedAt
    }
  }
`;

const xmlTemplatesQuery = graphql(getXmlTemplates, { name: 'xmlTemplatesQuery' });

export { xmlTemplatesQuery };