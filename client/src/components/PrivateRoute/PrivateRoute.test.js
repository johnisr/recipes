import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRoute } from './PrivateRoute';

test('should render correctly', () => {
  const component = () => <div>Hello</div>;
  const wrapper = shallow(
    <PrivateRoute isAuthenticated={false} component={component} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly', () => {
  const component = () => <div>Hello</div>;
  const wrapper = shallow(
    <PrivateRoute isAuthenticated component={component} />
  );
  expect(wrapper).toMatchSnapshot();
});
