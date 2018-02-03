// @flow
import React, { Component } from 'react';
import Chunk from 'components/Chunk';

const loadContainer = () => import('containers/Login' /* webpackChunkName: "login" */);

class Login extends Component<{}> {
  render() {
    return <Chunk load={loadContainer} />;
  }
}

export default Login;
