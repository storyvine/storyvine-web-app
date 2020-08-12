import gql from 'graphql-tag';

const QUERY_GLOBAL_CMS_VARIABLE = gql`
  query GlobalCmsVariable($id: ID!) {
    globalCmsVariable(id: $id) {
      id
      label
      key
      category
      inputType
      position
      lockableVariableFlag
    }
  }
`;


export { QUERY_GLOBAL_CMS_VARIABLE };