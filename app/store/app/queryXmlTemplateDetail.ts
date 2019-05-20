import gql from 'graphql-tag';

const QUERY_XML_TEMPLATE_DETAIL = gql`
  query XmlTemplateDetail($id: ID!) {
    xmlTemplateDetail(id: $id) {
      id
      name
      xml
      description
      templates {
        id
        name
      }
    }
  }
  `;


export { QUERY_XML_TEMPLATE_DETAIL };