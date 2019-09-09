import * as React from 'react';
import UserVariableForm from 'modules/UserVariableForm';
import { QUERY_USER_VARIABLE, MUTATION_UPDATE_USER_VARIABLE } from './store';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';

interface State { message:String };
type Props = RouteComponentProps;

class UserVariableEdit extends React.Component<Props, State> {
  state = {
    message: ''
  };
  render() {
    const { match: { params }}:any = this.props;

    return(
      <div>
        <p>{this.state.message}</p>

        <Query query={QUERY_USER_VARIABLE} variables={{ id: params.id }}>
          {
            ({ loading, data: { globalUserVariable }}) => {
              const fields = loading ? {} : globalUserVariable;

              return(
                <Mutation mutation={MUTATION_UPDATE_USER_VARIABLE} update={(_, { data: { updateUserVariable }}) => {
                  this.setState({ message: `User Generated Variable ${updateUserVariable.label} updated` });
                }}>
                  {
                    updateUserVariable => (
                      <UserVariableForm fields={fields} onValidSubmit={(updatedFields:any) => {
                        let variables = {id: params.id, ...updatedFields };
                        variables.position = variables.position.toString();
                        variables.screen = variables.screen.toString();
                        variables.characterLimit = variables.characterLimit.toString();

                        updateUserVariable({ variables: variables });
                      }} />
                    )
                  }
                </Mutation>
              );
            }
          }
        </Query>
      </div>
    );
  }
};

export default UserVariableEdit;