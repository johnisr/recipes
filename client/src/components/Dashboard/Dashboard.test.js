import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './Dashboard';

test('should render correctly', () => {
  const wrapper = shallow(<Dashboard user recipes={[]} />);
  expect(wrapper).toMatchSnapshot();
});
