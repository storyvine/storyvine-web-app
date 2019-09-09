import * as React from 'react';
import { QUERY_GLOBAL_CMS_VARIABLE, QUERY_GLOBAL_CMS_VARIABLES } from 'store/app';
import { MUTATION_UPDATE_CMS_VARIABLE } from './store';
import  { Query, Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import CmsVariableForm from 'modules/CmsVariableForm';
import { message } from 'antd';

type Props = RouteComponentProps;

class CmsVariableEdit extends React.Component<Props> {
  render() {
    const { match: { params }}:any = this.props;

    return(
      <Query query={QUERY_GLOBAL_CMS_VARIABLE} variables={{ id: params.id }}>
        {
          ({ loading, data: { globalCmsVariable } }) => {
            const fields = loading ? {} : globalCmsVariable;

            return(
              <div>
                <Mutation mutation={MUTATION_UPDATE_CMS_VARIABLE} update={(store, { data: { updateCmsVariable }}) => {
                  message.success(`CMS Variable ${updateCmsVariable.label} has been updated`);

                  const cmsVariablesQuery:any = store.readQuery({ query: QUERY_GLOBAL_CMS_VARIABLES });
                  const cmsVariables = cmsVariablesQuery ? cmsVariablesQuery.globalCmsVariables : [];
                  const index = cmsVariables.findIndex((cmsVariable:any) => cmsVariable.id == updateCmsVariable.id);
                  cmsVariables[index] = updateCmsVariable;
                  store.writeQuery({ query: QUERY_GLOBAL_CMS_VARIABLES, data: { globalCmsVariables: cmsVariables }});
                }}>
                  {
                    updateCmsVariable => (
                      <CmsVariableForm fields={fields} onValidSubmit={(updatedFields:any) => {
                        const variables = { id: params.id, ...updatedFields };
                        updateCmsVariable({ variables: variables });
                      }} />
                    )
                  }
                </Mutation>
              </div>
            );
          }
        }
      </Query>
    );
  }
};

export default CmsVariableEdit;