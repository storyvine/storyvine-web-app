// @flow
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { compose } from 'recompose';
import { Dropdown, Icon, Menu } from 'antd';
import { logout } from 'modules/user';
import get from 'lodash/get';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';
import Logo from 'images/logo-white.svg';
import s from './style.scss';

type Props = {
  logoutAction: () => {},
  name: string,
};

const Header = ({ logoutAction, name }: Props) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={logoutAction} className={s.Header__MenuItem}>
          <Icon type="logout" style={{ fontSize: '14px' }} />
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={s.Header}>
      <div className={s.Header__Logo}>
        <span>
          <img src={Logo} alt="GlassHouse logo" />
        </span>
      </div>
      <div className={s.Header__Heading}>
        <Switch>
          <Route path="/calendar" component={() => 'Calendar'} />
          <Route path="/workOrders" component={() => 'Work Orders'} />
          <Route path="/properties" component={() => 'Properties'} />
          <Route path="/houseManagers" component={() => 'House Managers'} />
          <Route path="/vendors" component={() => 'Vendors'} />
          <Route path="/emailTemplates" component={() => 'Email Templates'} />
          <Route path="/users" component={() => 'Users'} />
          <Route component={() => 'Unknown Route'} />
        </Switch>
        <div className={s.Header__Dropdown}>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <div className={s.Header__Dropdown__Anchor}>
              {name}
              <Icon type="caret-down" style={{ fontSize: '12px' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps: MapStateToProps<*, *, *> = ({ user }) => ({
  name: get(user, 'data.name'),
});

export default compose(withRouter, connect(mapStateToProps, { logoutAction: logout }, null))(Header);
