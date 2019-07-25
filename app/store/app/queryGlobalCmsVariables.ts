import gql from 'graphql-tag';

const QUERY_GLOBAL_CMS_VARIABLES = gql`
  query GlobalCmsVariables {
    globalCmsVariables {
      id
      label
      key
      category
      inputType
      updatedAt
    }
  }
`;

export { QUERY_GLOBAL_CMS_VARIABLES };