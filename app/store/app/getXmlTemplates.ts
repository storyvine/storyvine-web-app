import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getXmlTemplatesGql = gql`
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

const xmlTemplatesQuery = graphql(getXmlTemplatesGql, { name: 'xmlTemplatesQuery' });

export { xmlTemplatesQuery, getXmlTemplatesGql };