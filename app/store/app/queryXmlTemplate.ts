import gql from 'graphql-tag';

const QUERY_XML_TEMPLATE = gql`
  query XmlTemplate($id: ID!) {
    xmlTemplate(id: $id) {
      id
      name
      xml
      description
      state
    }
  }
  `;


export { QUERY_XML_TEMPLATE };