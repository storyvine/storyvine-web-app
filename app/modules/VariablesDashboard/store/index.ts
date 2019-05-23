import gql from 'graphql-tag';

const QUERY_GLOBAL_USER_VARIABLES = gql`
  query GlobalUserVariables {
    globalUserVariables {
      id
      key
      label
      position
      screen
      characterLimit
    }
  }
`;

const QUERY_GLOBAL_CMS_VARIABLES = gql`
  query GlobalCmsVariables {
    globalCmsVariables {
      id
      key
      label
    }
  }
`;

export { QUERY_GLOBAL_USER_VARIABLES, QUERY_GLOBAL_CMS_VARIABLES };