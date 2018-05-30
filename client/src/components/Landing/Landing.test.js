import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';

test('should render correctly', () => {
  const wrapper = shallow(<Landing />);
  expect(wrapper).toMatchSnapshot();
});
