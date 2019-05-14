import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const createXmlTemplateGql = gql`
  mutation CreateXmlTemplate($name: String!, $xml: String!) {
    createXmlTemplate(name: $name, xml: $xml) {
      id
      name
      xml
      createdAt
      updatedAt
    }
  }
`;

const createXmlTemplateMutation = graphql(createXmlTemplateGql, { name: 'CreateXmlTemplateMutation' });

export { createXmlTemplateMutation };