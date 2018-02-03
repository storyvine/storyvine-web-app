// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

type Props = {
  className: string,
  name: string,
  iconName: string,
  to: string,
  iconStyles?: Object | null,
};

const MenuLink = ({ className, to, name, iconName, iconStyles }: Props) => (
  <NavLink to={to} className={className}>
    <Icon type={iconName} style={iconStyles} />
    {name}
  </NavLink>
);

MenuLink.defaultProps = {
  iconStyles: null,
};

export default MenuLink;
