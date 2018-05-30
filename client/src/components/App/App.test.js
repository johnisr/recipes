import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

test('should render correctly', () => {
  const wrapper = shallow(<App fetchUser={jest.fn()} getRecipes={jest.fn()} />);
  expect(wrapper).toMatchSnapshot();
});
