import * as React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

test('Sidebar renders correctly', () => {
  expect(shallow(<Sidebar />)).toMatchSnapshot();
});
