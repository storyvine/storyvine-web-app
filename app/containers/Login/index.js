// @flow
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, Row, Form, Input, Icon } from 'antd';
import { login } from 'modules/user';
import { colors } from 'theme/variables';
import Logo from 'images/logo-white.svg';
import s from './style.scss';

const FormItem = Form.Item;

type Props = {
  form: Object,
  loginAction: (payload: Object) => Object,
};

const Login = ({ loginAction, form: { getFieldDecorator, validateFields } }: Props) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors, values) => {
      if (errors) return;
      loginAction(values);
    });
  }

  const userIcon = <Icon type="user" style={{ color: `${colors.blue1}` }} />;
  const lockIcon = <Icon type="lock" style={{ color: `${colors.blue1}` }} />;

  return (
    <div className={s.Login}>
      <img className={s.Logo} src={Logo} alt="GlassHouse logo" />
      <div className={s.Login__formBox}>
        <Row type="flex" justify="center">
          <h1>Welcome to GlassHouse!</h1>
          <p>Revolutionizing home ownership</p>
        </Row>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true }],
            })(<Input prefix={userIcon} size="large" onPressEnter={handleSubmit} placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true }],
            })(
              <Input
                prefix={lockIcon}
                size="large"
                type="password"
                onPressEnter={handleSubmit}
                placeholder="Password"
              />
            )}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleSubmit}>
              Log in
            </Button>
          </Row>
          <Row type="flex" justify="center">
            {/* <a href="#dontClick" onClick={e => e.preventDefault()}>
              Forgot password
            </a> */}
          </Row>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginAction: login,
};

export default compose(Form.create(), connect(null, mapDispatchToProps, null))(Login);
