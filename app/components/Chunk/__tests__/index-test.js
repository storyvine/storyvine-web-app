import React from 'react';
import { shallow } from 'enzyme';
import Chunk from '../';

// mock 'load' function that resolves to a component
const LoadedComponent = () => <div>loaded</div>;
const mockLoad = async () => ({ default: LoadedComponent });

it('renders the right component', async () => {
  // Render 'Chunk' with the mock 'load' function when loading is shown
  const wrapper = shallow(<Chunk load={mockLoad} />);

  // when the mock function resolves, 'Chunk' should render the obtained component
  // defaultly - loading is not shown
  await mockLoad();
  expect(wrapper.contains(<LoadedComponent useLoading={false} />)).toEqual(true);
});

it('passes the right props to the loaded component', async () => {
  // Render 'Chunk' with the mock 'load' function and a prop
  const wrapper = shallow(<Chunk load={mockLoad} foo="bar" />);

  await mockLoad();
  expect(wrapper.contains(<LoadedComponent foo="bar" useLoading={false} />)).toEqual(true);
});
