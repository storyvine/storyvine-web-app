import gql from 'graphql-tag';

const MUTATION_CREATE_CMS_VARIABLE = gql`
  mutation CreateCmsVariable($label: String!, $key: String!, $inputType: String!, $category: String!, $lockableVariableFlag: Boolean) {
    createCmsVariable(label: $label, key: $key, inputType: $inputType, category: $category, lockableVariableFlag: $lockableVariableFlag) {
      id
      label
      key
      category
      inputType
      updatedAt
      position
      lockableVariableFlag
    }
  }
`;

export { MUTATION_CREATE_CMS_VARIABLE };