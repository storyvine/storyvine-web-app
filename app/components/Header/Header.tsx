import * as React from 'react';
import { Route, Switch, withRouter, RouteProps } from 'react-router';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import startCase from 'lodash/startCase';
const { useCallback, useContext } = React;

import { withErrorBoundary } from 'components/ErrorBoundary';
// import { NotificationListDropdown } from 'modules/Notifications';
// import { UserMenuDropdown } from 'modules/UserMenu';
import { ShowSidebarContext } from 'store/sidebar';
import s from './Header.scss';

const Breadcrumbs: React.ComponentType<RouteProps> = ({ location }) => {
  const steps = location && location.pathname.split('/').filter((pt: string) => pt);

  if (!steps) {
    console.warn('location is not available - could not render Breadcrumbs');
    return <></>;
  }

  const isInLoanDetail = steps[0] === 'loans' && steps[2];
  return (
    <>
      {steps.map((step: string, i: number) => {
        const label = isInLoanDetail && i === 2 ? `loan ${step.toUpperCase()}` : step;
        const isLast = i === steps.length - 1;
        return (
          <NavLink to={`/${steps.slice(0, i + 1).join('/')}`} key={`link-${step}`}>
            {startCase(label)}&nbsp;{!isLast ? '/' : ''}&nbsp;
          </NavLink>
        );
      })}
    </>
  );
};

interface Props {
  showSidebar: () => any;
}

const Header = (props: Props) => {
  const { showSidebar } = useContext(ShowSidebarContext);
  return (
    <div className={s.Header}>
      <div className={s.Header__MainSection}>
        <Button
          icon="bars"
          className={s.BurgerButton}
          onClick={useCallback(() => {
            showSidebar && showSidebar();
            if (!!document && !!document.querySelector('#root')) {
              document.querySelector('#root')!.classList.add('no-scroll');
            }
            window.scrollTo(0, 0);
          }, [])}
          style={{ color: 'black', backgroundColor: 'white' }}
        />
        <div className={s.Header__Breadcrumbs}>
          <Switch>
            <Route path="/dashboard" component={Breadcrumbs} />
            <Route path="/loans/:type" component={Breadcrumbs} />
            <Route exact path="/admin" component={Breadcrumbs} />
            <Route path="/admin/company-info" component={Breadcrumbs} />
            <Route
              path="/admin/users/me"
              component={useCallback(
                () => (
                  <>My Account</>
                ),
                []
              )}
            />
            <Route path="/admin/users" component={Breadcrumbs} />
            <Route path="/notifications" component={Breadcrumbs} />
            <Route path="/xml_templates" component={Breadcrumbs} />
            <Route
              component={useCallback(
                () => (
                  <span>This page was not found :-(</span>
                ),
                []
              )}
            />
          </Switch>
        </div>
        <div className={s.Header__Buttons}>
          {/* <NotificationListDropdown entryCountLimit={5} /> */}
          {/* <UserMenuDropdown /> */}
        </div>
      </div>
    </div>
  );
};

export default compose<Props, {}>(
  withRouter,
  withApollo,
  withErrorBoundary
)(Header);
