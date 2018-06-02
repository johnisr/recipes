import { setRecipeNameFilter } from './actions';
import { SET_RECIPE_NAME_FILTER } from './types';

test('should create a SET_RECIPE_NAME_FILTER action object', () => {
  const name = 'abc';
  const action = setRecipeNameFilter(name);
  expect(action).toEqual({ type: SET_RECIPE_NAME_FILTER, payload: name });
});
