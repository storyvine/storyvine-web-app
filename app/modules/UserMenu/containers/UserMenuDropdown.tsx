import * as React from 'react';
import { Dropdown, Icon } from 'antd';
import { compose } from 'recompose';
import { withRouter, RouterProps } from 'react-router';
import { withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import logoutAction from 'utils/logoutAction';
import Loading from 'components/Loading';
import { authUserDataQuery as withAuthUserDataQuery, AuthUserDataQuery, User } from 'store/app';
import UserMenu, { UserMenuItem } from '../components/UserMenu';
import s from './UserMenuDropdown.scss';

const getUserMenuItems = (
  user: User,
  history: RouterProps['history'],
  client: ApolloClient<any>
): UserMenuItem[] => [
  {
    action: () => history.push(`/users/${user.id}`),
    label: 'My Account',
    icon: 'user',
  },
  {
    action: () => logoutAction(history, client),
    label: 'Logout',
    icon: 'logout',
  },
];

interface Props {
  children: any;
  authUserDataQuery: AuthUserDataQuery;
  history: RouterProps['history'];
  client: ApolloClient<any>;
}

const UserMenuDropdown = ({ authUserDataQuery, history, client }: Props) => {
  if (!authUserDataQuery.loading && !authUserDataQuery.me)
    return <NavLink to="/login">Login</NavLink>;

  if (authUserDataQuery.loading) return <Loading />;

  const user: User = { ...authUserDataQuery.me, id: 'me' };
  const loading = authUserDataQuery.loading;

  return (
    <div className={classNames('user-menu-dropdown', s.UserMenuDropdown)}>
      <Dropdown
        overlay={<UserMenu items={getUserMenuItems(user, history, client)} />}
        placement="bottomRight"
        trigger={['click']}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className={s.UserMenuDropdown__Anchor}>
            <img
              alt=""
              src={/* me.avatarUrl || */ 'https://d30y9cdsu7xlg0.cloudfront.net/png/429590-200.png'}
            />
            <div>
              <span>{`${user.firstName} ${user.lastName.charAt(0)}.`}</span>
              <Icon type="caret-down" style={{ fontSize: '8px' }} />
            </div>
          </div>
        )}
      </Dropdown>
    </div>
  );
};

export default compose<Props, Props>(
  withRouter,
  withApollo,
  withAuthUserDataQuery
)(UserMenuDropdown);
