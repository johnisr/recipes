import React from 'react';
import { shallow } from 'enzyme';
import { RecipeForm } from './RecipeForm';

let valid;
let onRecipeSubmitSpy;
let submitting;
beforeAll(() => {
  valid = false;
  onRecipeSubmitSpy = jest.fn();
  submitting = false;
});

test('should render correctly', () => {
  const wrapper = shallow(
    <RecipeForm
      valid={valid}
      onRecipeSubmit={onRecipeSubmitSpy}
      submitting={submitting}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should disable button when submitting is true', () => {
  submitting = true;
  const wrapper = shallow(
    <RecipeForm
      valid={valid}
      onRecipeSubmit={onRecipeSubmitSpy}
      submitting={submitting}
    />
  );

  expect(
    wrapper
      .find('Button')
      .at(1)
      .prop('disabled')
  ).toBe(true);
});

test('should call onRecipeSubmit if form valid (true)', () => {
  valid = true;
  submitting = false;
  const wrapper = shallow(
    <RecipeForm
      valid={valid}
      onRecipeSubmit={onRecipeSubmitSpy}
      submitting={submitting}
    />
  );
  // Semantic UI takes Form => Object with prop "as": "form"
  wrapper
    .find({ as: 'form' })
    .at(0)
    .simulate('submit', {
      preventDefault: () => {},
    });

  expect(onRecipeSubmitSpy).toHaveBeenCalled();
});

test('should set showAllErrors if form not valid', () => {
  valid = false;
  submitting = false;
  const wrapper = shallow(
    <RecipeForm
      valid={valid}
      onRecipeSubmit={onRecipeSubmitSpy}
      submitting={submitting}
    />
  );

  // Semantic UI takes Form => Object with prop "as": "form"
  wrapper
    .find({ as: 'form' })
    .at(0)
    .simulate('submit', {
      preventDefault: () => {},
    });
  expect(wrapper.state('showAllErrors')).toBe(true);
});
