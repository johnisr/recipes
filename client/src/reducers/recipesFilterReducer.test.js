import recipesFilterReducer, {
  recipesFilterDefaultState,
} from './recipesFilterReducer';
import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
} from '../actions/types';

test('should setup default filter values', () => {
  const state = recipesFilterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(recipesFilterDefaultState);
});

test('should set recipes name filter', () => {
  const name = 'hello';
  const action = { type: SET_RECIPE_NAME_FILTER, payload: name };
  const state = recipesFilterReducer(undefined, action);
  expect(state.name).toBe(name);
});

test('should set recipes tags filter', () => {
  const tags = ['hello', 'tags'];
  const action = { type: SET_RECIPE_TAGS_FILTER, payload: tags };
  const state = recipesFilterReducer(undefined, action);
  expect(state.tags).toBe(tags);
});
