import React from 'react';
import { shallow } from 'enzyme';
import { RecipeEdit } from './RecipeEdit';

test('should render correctly', () => {
  const wrapper = shallow(<RecipeEdit />);
  expect(wrapper).toMatchSnapshot();

  wrapper.setState({ showFormReview: true });
  expect(wrapper).toMatchSnapshot();
});
