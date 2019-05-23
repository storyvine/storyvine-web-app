import gql from 'graphql-tag';

const QUERY_GLOBAL_CMS_VARIABLES = gql`
  query GlobalCmsVariables {
    globalCmsVariables {
      id
      label
      key
      inputType
    }
  }
`;

export { QUERY_GLOBAL_CMS_VARIABLES };