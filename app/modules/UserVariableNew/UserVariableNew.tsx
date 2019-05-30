import * as React from 'react';
import UserVariableForm from 'modules/UserVariableForm';
import { MUTATION_CREATE_USER_VARIABLE } from './store';
import { Mutation } from 'react-apollo';

interface State { message:String };

class UserVariableNew extends React.Component<State> {
  state = {
    message: ''
  };
  render() {
    return(
      <div>
        <p>{this.state.message}</p>
        <Mutation mutation={MUTATION_CREATE_USER_VARIABLE} update={(_, { data: { createUserVariable }}) => {
          const message = `User Generated Variable ${createUserVariable.label} created`;
          this.setState({ message: message });          
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