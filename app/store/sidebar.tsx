import * as React from 'react';
const { useState, useMemo } = React;

export namespace Sidebar {
  export interface Props {
    isShownSidebar: boolean;
    showSidebar: () => any;
    hideSidebar: () => any;
  }
}

export const ShowSidebarContext = React.createContext({
  isShownSidebar: false,
  toggleSidebar: () => {},
  hideSidebar: () => {},
  showSidebar: () => {},
});

export const withShowSidebar = (Component: React.ComponentType<Sidebar.Props>) => (
  props: Sidebar.Props
) => (
  <ShowSidebarContext.Consumer>
    {({ isShownSidebar, showSidebar, hideSidebar }) => (
      <Component
        {...props}
        isShownSidebar={isShownSidebar}
        showSidebar={showSidebar}
        hideSidebar={hideSidebar}
      />
    )}
  </ShowSidebarContext.Consumer>
);

const ShowSidebarProvider: React.ComponentType<{}> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  /**
   * To prevent unneccessary re-renders:
   */
  const value = useMemo(
    () => ({
      isShownSidebar: visible,
      toggleSidebar: () => setVisible(!visible),
      hideSidebar: () => setVisible(false),
      showSidebar: () => setVisible(true),
    }),
    [visible]
  );

  return <ShowSidebarContext.Provider value={value}>{children}</ShowSidebarContext.Provider>;
};

export default ShowSidebarProvider;
