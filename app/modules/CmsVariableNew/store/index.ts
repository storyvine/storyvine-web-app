import gql from 'graphql-tag';

const MUTATION_CREATE_CMS_VARIABLE = gql`
  mutation CreateCmsVariable($label: String!, $key: String!, $inputType: String!, $category: String!) {
    createCmsVariable(label: $label, key: $key, inputType: $inputType, category: $category) {
      id
      label
      key
      category
      inputType
      updatedAt
    }
  }
`;

export { MUTATION_CREATE_CMS_VARIABLE };