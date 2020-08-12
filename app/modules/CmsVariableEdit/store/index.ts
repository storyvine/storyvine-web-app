import gql from 'graphql-tag';

const MUTATION_UPDATE_CMS_VARIABLE = gql`
  mutation UpdateCmsVariable($id: ID!, $label: String!, $key: String!, $inputType: String!, $category: String!, $lockableVariableFlag: Boolean) {
    updateCmsVariable(id: $id, label: $label, key: $key, inputType: $inputType, category: $category, lockableVariableFlag: $lockableVariableFlag) {
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

export { MUTATION_UPDATE_CMS_VARIABLE };