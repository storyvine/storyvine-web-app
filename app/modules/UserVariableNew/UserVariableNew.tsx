import * as React from 'react';
import UserVariableForm from 'modules/UserVariableForm';
import { MUTATION_CREATE_USER_VARIABLE } from './store';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps;

class UserVariableNew extends React.Component<Props> {
  render() {
    return(
      <div>
        <Mutation mutation={MUTATION_CREATE_USER_VARIABLE} update={(_, { data: { createUserVariable }}) => {
          message.success(`User Generated Variable ${createUserVariable.label} created`);
          this.props.history.push('/xml_templates');
        }}>
          { createCmsTemplate => (
            <div>
              <UserVariableForm fields={{}} onValidSubmit={(updatedFields:any) => {
                createCmsTemplate({ variables: updatedFields });
              }} />
            </div>
          )}
        </Mutation>
      </div>
    );
  }
};

export default UserVariableNew;
