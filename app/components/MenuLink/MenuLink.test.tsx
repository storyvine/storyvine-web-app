import * as React from 'react';
import { shallow } from 'enzyme';
import MenuLink from './MenuLink';

test('MenuLink renders correctly', () => {
  expect(shallow(<MenuLink name="test" to="testPath" />)).toMatchSnapshot();
});

test('MenuLink renders correctly with icon', () => {
  expect(shallow(<MenuLink name="test" to="testPath" iconName="testName" />)).toMatchSnapshot();
});

test('MenuLink hide sidebar on click', () => {
  const hideSidebarSpy = jest.fn();
  const MenuLinkComponent = shallow(<MenuLink name="test" to="testPath" hideSidebar={hideSidebarSpy} />);
  MenuLinkComponent.find('NavLink').simulate('click');
  expect(hideSidebarSpy.mock.calls.length).toBe(1);
});
