import gql from 'graphql-tag';

const MUTATION_CREATE_CMS_VARIABLE = gql`
  mutation CreateCmsVariable($label: String!, $key: String!, $inputType: String!) {
    createCmsVariable(label: $label, key: $key, inputType: $inputType) {
      id
      label
      key
      inputType
    }
  }
`;

export { MUTATION_CREATE_CMS_VARIABLE };