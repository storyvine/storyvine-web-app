import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
// import Cookie from 'js-cookie';
// import { message } from 'antd';
import get from 'lodash/get';
import loginAction from 'utils/loginAction';

import { withErrorBoundary } from 'components/ErrorBoundary';
import Loading from 'components/Loading';
import Router from 'routes/Router';
import { authUserQuery } from 'store/app';
// import { renewSignin } from 'modules/Login';
import 'theme/main.scss';

interface Props {
  // user: Object,
  // RenewSignin: Function,
  AuthUserQuery: Function;
  location: { pathname: string };
}

interface State {
  originalLocation: string;
  location: string;
  renewInterval?: string;
}

const NON_PROTECTED_ROUTES = ['/login'];
// const isProtectedRoute = location => !NON_PROTECTED_ROUTES.some(l => l === location);

class App extends React.Component<Props, State> {
  state: State = {
    originalLocation: this.props.location.pathname,
    location: this.props.location.pathname,
    renewInterval: undefined,
  };

  // static getDerivedStateFromProps(nextProps, previousState) {
  //   const location = nextProps.location.pathname;
  //   if (isProtectedRoute(location) && !previousState.renewInterval) {
  //     const { RenewSignin } = nextProps;
  //     const renewInterval = setInterval(async () => {
  //       try {
  //         const renewResult = await RenewSignin();
  //         const token = renewResult.data.renewSignin.token;
  // loginAction()
  //       } catch (e) {
  //         console.log(e);
  //         message.error('Renewing token failed, you will be logged out soon');
  //       }
  //     }, 5 * 60 * 1000);
  //     return { renewInterval };
  //   }
  //   return false;
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.renewInterval);
  //   this.setState({ renewInterval: undefined });
  // }

  render() {
    const {
      location: { pathname: location },
      AuthUserQuery,
    } = this.props;
    const signinStep = get(AuthUserQuery, 'me.signinData.signinStep');
    const isLoggedIn = signinStep === 'passed2FA' || signinStep === 'disabled2FA';
    // if (AuthUserQuery.loading) return <Loading />;
    // else if (isLoggedIn && location === '/login') return <Redirect to="/dashboard" />;
    // else if (!isLoggedIn && isProtectedRoute(location)) return <Redirect to="/login" />;
    return <Router />;
  }
}

export default compose<Props, State>(
  withRouter,
  // authUserQuery,
  //  renewSignin,
  withErrorBoundary
)(App);
