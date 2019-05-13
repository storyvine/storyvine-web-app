import * as React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

test('Header renders correctly', () => {
  expect(shallow(<Header />)).toMatchSnapshot();
});
