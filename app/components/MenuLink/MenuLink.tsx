
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

interface Props {
  className?: string,
  name: string,
  iconName?: string,
  to: string,
  iconStyles?: Object,
  hideSidebar?: () => any,
};

const MenuLink = ({ className, to, name, iconName, iconStyles, hideSidebar }: Props) => (
  <NavLink to={to} className={className} onClick={hideSidebar}>
    {iconName && <Icon type={iconName} style={iconStyles} />}
    {name}
  </NavLink>
);

MenuLink.defaultProps = {
  iconStyles: null,
};

export default MenuLink;
