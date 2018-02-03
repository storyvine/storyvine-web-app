// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';

import ErrorBoundary from 'components/ErrorBoundary';
import AppError from 'components/AppError';
import Dashboard from 'routes/Dashboard';
import Login from 'routes/Login';
import 'theme/main.scss';
import s from './style.scss';

type Props = {
  user: Object,
};

const mapStateToProps: MapStateToProps<*, *, *> = ({ user }) => ({
  user,
});

const ProtectedRoute = connect(mapStateToProps, null, null)(({ user, ...props }: Props) => {
  if (!user.jwt) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
});

const AthenticationRoute = connect(mapStateToProps, null, null)(({ user, ...props }: Props) => {
  if (user.jwt) {
    return <Redirect to="/calendar" />;
  }
  return <Route {...props} />;
});

const App = () => (
  <ErrorBoundary fallbackComponent={AppError}>
    <div className={s.App}>
      <Switch>
        <AthenticationRoute exact path="/login" component={Login} />
        <ProtectedRoute path="/" component={Dashboard} />
        <Route component={() => <div>Not found</div>} />
      </Switch>
    </div>
  </ErrorBoundary>
);

export default App;
