import * as React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { withErrorBoundary } from 'components/ErrorBoundary';
import UserDetail from 'routes/UserDetail';
import Login from 'routes/Login';
import Dashboard from 'routes/Dashboard';
import XmlTemplateIndex from 'routes/XmlTemplateIndex';
import XmlTemplateNew from 'routes/XmlTemplateNew';
import XmlTemplateEdit from 'routes/XmlTemplateEdit';
import CenterLayout from 'layouts/Centered';
import FullPageLayout from 'layouts/FullPage';
import XmlTemplateShow from './XmlTemplateShow';
import VariablesDashboard from './VariablesDashboard';
import CmsVariableNew from './CmsVariableNew';

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
    <Redirect exact from="/" to="/xml_templates" />
    <FullPageLayoutRoute path="/dashboard" Component={Dashboard} />
    <Route
      exact
      path="/users/:id"
      render={(props: any) => <Redirect to={`/admin/users/${props.match.params.id}`} />}
    />
    <Redirect exact from="/users" to="/admin/users" />
    <FullPageLayoutRoute path="/admin/users/:id" Component={UserDetail} />

    <FullPageLayoutRoute path="/xml_templates/:id/edit" Component={XmlTemplateEdit} />
    <FullPageLayoutRoute path="/xml_templates/new" Component={XmlTemplateNew} />
    <FullPageLayoutRoute path="/xml_templates/:id" Component={XmlTemplateShow} />
    <FullPageLayoutRoute path="/xml_templates" Component={XmlTemplateIndex} />

    <FullPageLayoutRoute path="/variables" Component={VariablesDashboard} />
    <FullPageLayoutRoute path="/cms_variables/new" Component={CmsVariableNew} />
    <FullPageLayoutRoute Component={() => <div>Not found</div>} />
  </Switch>
);

export default withErrorBoundary(Router);
