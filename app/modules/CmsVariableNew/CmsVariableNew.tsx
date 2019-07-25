import * as React from 'react';
import CmsVariableForm from 'modules/CmsVariableForm';
import { MUTATION_CREATE_CMS_VARIABLE } from './store';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps;

class CmsVariableNew extends React.Component<Props> {
  render() {
    const fields = { label: '', key: '', inputType: '' };

    return(
      <div>
        <h3>New CMS variable</h3>
        <Mutation mutation={MUTATION_CREATE_CMS_VARIABLE} update={(_store, { data: { createCmsVariable }}) => {
          message.success(`CMS Variable ${createCmsVariable.label} has been created`);
          this.props.history.push('/variables');
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
