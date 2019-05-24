import gql from 'graphql-tag';

const MUTATION_UPDATE_CMS_VARIABLE = gql`
  mutation UpdateCmsVariable($id: ID!, $label: String!, $key: String!, $inputType: String!) {
    updateCmsVariable(id: $id, label: $label, key: $key, inputType: $inputType) {
      id
      label
      key
      inputType
    }
  }
`;

export { MUTATION_UPDATE_CMS_VARIABLE };