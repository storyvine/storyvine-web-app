import * as React from 'react';
import CmsVariableForm from 'modules/CmsVariableForm';
import { MUTATION_CREATE_CMS_VARIABLE } from './store';
import { QUERY_GLOBAL_CMS_VARIABLES } from 'store/app';
import { Mutation } from 'react-apollo';

interface State { message:String };

class CmsVariableNew extends React.Component<State> {
  state = {
    message: ''
  };
  render() {
    const fields = { label: '', key: '', inputType: '' };

    return(
      <div>
        <h3>New CMS variable</h3>
        <p>{this.state.message}</p>
        <Mutation mutation={MUTATION_CREATE_CMS_VARIABLE} update={(store, { data: { createCmsVariable }}) => {
          const message = `CMS Variable ${createCmsVariable.label} has been created`;
          this.setState({ message: message });

          const globalCmsVariablesQuery:any = store.readQuery({ query: QUERY_GLOBAL_CMS_VARIABLES });
          const globalCmsVariables = globalCmsVariablesQuery ? globalCmsVariablesQuery.globalCmsVariables : [];
          store.writeQuery({ query: QUERY_GLOBAL_CMS_VARIABLES, data: { globalCmsVariables: [createCmsVariable, ...globalCmsVariables] }});
        }}>
          {
            createCmsVariable => (
              <div>
                <CmsVariableForm fields={fields} onValidSubmit={(validFields:any) => {
                  createCmsVariable({ variables: validFields });
                }} />
              </div>
            )
          }
        </Mutation>
      </div>
    );
  };
};

export default CmsVariableNew;
