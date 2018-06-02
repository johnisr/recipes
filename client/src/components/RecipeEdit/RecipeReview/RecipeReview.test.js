import React from 'react';
import { shallow } from 'enzyme';
import { RecipeReview } from './RecipeReview';

import formValuesArray from '../../../tests/fixtures/formValues';

test('should render correctly', () => {
  const wrapper = shallow(
    <RecipeReview
      onCancel={jest.fn()}
      formValues={formValuesArray[0].request}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should call onCancel on button click', () => {
  const onCancelSpy = jest.fn();
  const wrapper = shallow(<RecipeReview onCancel={onCancelSpy} />);
  wrapper
    .find('Button')
    .at(0)
    .simulate('click');
  expect(onCancelSpy).toHaveBeenCalled();
});

describe('When calling onSubmit', () => {
  let history;
  let postRecipe;
  let onCancelSpy;
  beforeEach(() => {
    history = { push: jest.fn() };
    postRecipe = jest.fn();
    onCancelSpy = jest.fn();
  });

  test('should format formValues', () => {
    const wrapper = shallow(
      <RecipeReview
        formValues={formValuesArray[0].request}
        history={history}
        postRecipe={postRecipe}
        onCancel={onCancelSpy}
        match={{ params: {} }}
      />
    );
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(postRecipe).toHaveBeenLastCalledWith(formValuesArray[0].response);
  });

  // test('should call history.push to /dashboard', () => {
  //   const wrapper = shallow(
  //     <RecipeReview
  //       formValues={formValues}
  //       history={history}
  //       postRecipe={postRecipe}
  //       onCancel={onCancelSpy}
  //     />
  //   );
  //   wrapper
  //     .find('button')
  //     .at(1)
  //     .simulate('click');
  //   expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  // });

  test('should call onCancel when formValues are not valid', () => {
    const wrapper = shallow(
      <RecipeReview
        formValues={{}}
        history={history}
        postRecipe={postRecipe}
        onCancel={onCancelSpy}
      />
    );
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(onCancelSpy).toHaveBeenCalled();
  });
});
