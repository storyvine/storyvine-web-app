import gql from 'graphql-tag';

const MUTATION_UPDATE_CMS_VARIABLE = gql`
  mutation UpdateCmsVariable($id: ID!, $label: String!, $key: String!, $inputType: String!, $category: String!) {
    updateCmsVariable(id: $id, label: $label, key: $key, inputType: $inputType, category: $category) {
      id
      label
      key
      category
      inputType
      updatedAt
      position
    }
  }
`;

export { MUTATION_UPDATE_CMS_VARIABLE };