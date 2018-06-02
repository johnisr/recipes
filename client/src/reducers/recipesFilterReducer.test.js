import recipesFilterReducer, {
  recipesFilterDefaultState,
} from './recipesFilterReducer';
import { SET_RECIPE_NAME_FILTER } from '../actions/types';

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
