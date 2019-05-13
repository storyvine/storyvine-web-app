import * as React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { withErrorBoundary } from 'components/ErrorBoundary';
import UserDetail from 'routes/UserDetail';
import Login from 'routes/Login';
import Dashboard from 'routes/Dashboard';
import CenterLayout from 'layouts/Centered';
import FullPageLayout from 'layouts/FullPage';

type LayoutRouteProps = {
  Component: React.ComponentType<any>;
} & RouteProps;

const CenterLayoutRoute = ({ Component, ...props }: LayoutRouteProps) => (
  <Route
    {...props}
    render={matchProps => (
      <CenterLayout>
        <Component {...matchProps} />
      </CenterLayout>
    )}
  />
);

const FullPageLayoutRoute = ({ Component, ...props }: LayoutRouteProps) => (
  <Route
    {...props}
    render={matchProps => (
      <FullPageLayout>
        <Component {...matchProps} />
      </FullPageLayout>
    )}
  />
);

const Router = () => (
  <Switch>
    <CenterLayoutRoute exact path="/login" Component={Login} />
    <Redirect exact from="/" to="/dashboard" />
    <FullPageLayoutRoute path="/dashboard" Component={Dashboard} />
    <Route
      exact
      path="/users/:id"
      render={(props: any) => <Redirect to={`/admin/users/${props.match.params.id}`} />}
    />
    <Redirect exact from="/users" to="/admin/users" />
    <FullPageLayoutRoute path="/admin/users/:id" Component={UserDetail} />
    <FullPageLayoutRoute Component={() => <div>Not found</div>} />
  </Switch>
);

export default withErrorBoundary(Router);