
import * as React from 'react';
import { Menu, Icon } from 'antd';

// @ts-ignore: FIXME
import s from './UserMenu.scss';

export interface UserMenuItem {
  action: () => any,
  label: string,
  icon: string,
};

interface Props {
  items: UserMenuItem[],
};

const UserMenu = ({ items }: Props) => (
  <div className={s.UserMenu}>
    <Menu>
      {items.map(item => (
        <Menu.Item key={item.icon}>
          <div onClick={item.action} className={s.UserMenu__MenuItem}>
            <Icon type={item.icon} style={{ fontSize: '14px' }} />
            {item.label}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  </div>
);

export default UserMenu;
