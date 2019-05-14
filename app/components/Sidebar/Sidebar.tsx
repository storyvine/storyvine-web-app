import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Menu, Button } from 'antd';
import { ShowSidebarContext } from 'store/sidebar';
import { withErrorBoundary } from 'components/ErrorBoundary';
import MenuLink from 'components/MenuLink';
import Logo from 'images/no-logo.png';
import s from './Sidebar.scss';
const { useCallback, useContext } = React;

interface Props {
  children: any;
  location: {
    pathname: string;
  };
}

interface Item {
  title: string;
  link: string;
  key?: string;
  icon?: string;
}

interface ParentItem {
  title: string;
  key: string;
  children: Item[];
}

const menu: (Item | ParentItem)[] = [
  { link: '/dashboard', title: 'Dashboard', icon: 'area-chart' },
  { link: '/xml_templates', title: 'XML Templates', icon: 'area-chart' },
  // {
  //   key: 'withSubmenus',
  //   title: 'WITH SUBITEMS',
  //   children: [
  //     { title: 'Subtitle 1', link: '/subpage/first', key: 'first' },
  //     { title: 'Subtitle 2', link: `/subpage/second`, key: 'second' },
  //   ],
  // },
];

const Sidebar = (props: Props) => {
  const { location } = props;
  const { hideSidebar, isShownSidebar } = useContext(ShowSidebarContext);

  const renderItem = (item: Item, key: number) => (
    <Menu.Item key={key || item.title}>
      <MenuLink
        name={item.title}
        to={item.link}
        hideSidebar={hideSidebar}
        className={undefined}
        iconName={undefined}
        iconStyles={undefined}
      />
    </Menu.Item>
  );

  const renderSubmenu = (submenu: ParentItem) => (
    <Menu.SubMenu key={submenu.key} title={submenu.title}>
      {submenu.children && submenu.children.map(renderItem)}
    </Menu.SubMenu>
  );
  return (
    <div className={`${s.Sidebar} ${isShownSidebar ? s.Sidebar__show_mobile : ''}`}>
      <div className={s.Sidebar__Header}>
        <Button
          icon="bars"
          className={s.BurgerButton}
          onClick={useCallback(() => {
            hideSidebar();
            const root = document && document.querySelector('#root');
            if (root) {
              root.classList.remove('no-scroll');
            }
          }, [])}
          style={{ color: 'white', backgroundColor: '#292c39' }}
        />
        <div className={s.Sidebar__Logo}>
          <NavLink to="/dashboard">
            <img src={Logo} alt="Boilerplate logo" />
          </NavLink>
        </div>
      </div>
      <Menu
        mode="inline"
        className={s.Sidebar__Navigation}
        defaultOpenKeys={['withSubmenus']}
        selectedKeys={[location.pathname.split('/')[2]]}
        inlineIndent={0}
      >
        {menu.map((item, key) =>
          (item as ParentItem).children
            ? renderSubmenu(item as ParentItem)
            : renderItem(item as Item, key)
        )}
      </Menu>
    </div>
  );
};

export default compose<Props, {}>(
  withRouter,
  withErrorBoundary
)(Sidebar);
