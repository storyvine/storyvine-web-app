import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getXmlTemplateGql = gql`
  query {
    xmlTemplate(id: 10) {
      id
      name
      xml
    }
  }
`;

const xmlTemplateQuery = graphql(getXmlTemplateGql, { name: 'XmlTemplateQuery' });

export { xmlTemplateQuery };