// @flow
import React from 'react';
import MenuLink from 'components/MenuLink';
import s from './style.scss';

const MainMenu = () => (
  <div className={s.MainMenu}>
    <MenuLink name="Calendar" to="/calendar" iconName="calendar" className={s.MainMenu__Item} />
    <MenuLink name="Work Orders" to="/workOrders" iconName="exception" className={s.MainMenu__Item} />
    <MenuLink name="Properties" to="/properties" iconName="home" className={s.MainMenu__Item} />
    <MenuLink name="House Managers" to="/houseManagers" iconName="tool" className={s.MainMenu__Item} />
    <MenuLink name="Vendors" to="/vendors" iconName="idcard" className={s.MainMenu__Item} />
    <MenuLink name="Email Templates" to="/emailTemplates" iconName="mail" className={s.MainMenu__Item} />
    <MenuLink name="Users" to="/users" iconName="user" className={s.MainMenu__Item} />
  </div>
);

export default MainMenu;
