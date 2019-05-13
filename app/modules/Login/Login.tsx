import * as React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button, Row, Form, Input, Icon, /* Checkbox, */ message } from 'antd';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import { signinMutation } from './store';
import authUserGql from './store/authUser.gql';
import s from './Login.scss';
import { FormComponentProps } from 'antd/lib/form/Form';
import { MutationFn } from 'react-apollo';
import loginAction from 'utils/loginAction';

const FormItem = Form.Item;

interface State {
  loading: boolean;
}

interface InnerProps {
  SigninMutation: MutationFn;
}

type Props = InnerProps & FormComponentProps;

class Login extends React.Component<Props, State> {
  state = {
    loading: false,
  };
  handleSubmit = (e: React.SyntheticEvent) => {
    const {
      SigninMutation,
      form: { validateFields },
    } = this.props;
    e.preventDefault();
    validateFields(async (errors, { email, password }) => {
      if (errors) return;
      try {
        this.setState({ loading: true });
        await SigninMutation({
          variables: {
            input: { email, password },
          },
          update: (store, result) => {
            const token = get(result, 'data.signin.token');
            loginAction(token);
            store.writeQuery({ query: authUserGql, data: { me: result.data.signin.me } });
          },
        });
      } catch (error) {
        message.error(`Failed to login: check the username and password`);
      }
      this.setState({ loading: false });
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const userIcon = <Icon type="user" style={{ color: '#ffb533' }} />;
    const lockIcon = <Icon type="lock" style={{ color: '#ffb533' }} />;
    return (
      <div>
        <div className={s.Login}>
          <Row type="flex">
            <h1>Login to your account</h1>
          </Row>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('email', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={userIcon}
                  size="large"
                  onPressEnter={this.handleSubmit}
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={lockIcon}
                  size="large"
                  type="password"
                  onPressEnter={this.handleSubmit}
                  placeholder="Password"
                />
              )}
            </FormItem>
            {/* <div className={s.Login__keep_signed}>
              <Checkbox>Keep me signed in</Checkbox>
            </div> */}
            <Row>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                loading={this.state.loading}
              >
                Log in
              </Button>
            </Row>
          </form>
        </div>
        <Row style={{ marginTop: 10, textAlign: 'center' }}>
          <span className={s.Login__forgot_pass}>Forgot Your password?&nbsp;</span>
          {/* ON_STARTUP: change email */}
          <a href="mailto:name@email.com">Contact support</a>
        </Row>
      </div>
    );
  }
}

export default compose<InnerProps, {}>(
  withRouter,
  signinMutation
)(Form.create<Props>()(Login));
