import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const updateXmlTemplateGql = gql`
  mutation UpdateXmlTemplate($id: ID!, $name: String!, $xml: String!) {
    updateXmlTemplate(id: $id, name: $name, xml: $xml) {
      id
      name
      xml
      createdAt
      updatedAt
      templatesCount
    }
  }
`;

const updateXmlTemplateMutation = graphql(updateXmlTemplateGql, { name: 'UpdateXmlTemplateMutation' });

export { updateXmlTemplateMutation };