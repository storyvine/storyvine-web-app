import * as React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

test('Loading renders correctly', () => {
  expect(shallow(<Loading />)).toMatchSnapshot();
});
