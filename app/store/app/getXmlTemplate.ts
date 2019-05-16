import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const getXmlTemplateGql = gql`
  query XmlTemplate($id: ID) {
    xmlTemplate(id: $id) {
      id
      name
      xml
    }
  }
`;

const xmlTemplateQuery = graphql(getXmlTemplateGql, { name: 'XmlTemplateQuery' });

export { xmlTemplateQuery };