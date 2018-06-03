import { setRecipeNameFilter } from './actions';
import { SET_RECIPE_NAME_FILTER } from './types';

test('should create a SET_RECIPE_NAME_FILTER action object', () => {
  const name = 'abc';
  const action = setRecipeNameFilter(name);
  expect(action).toEqual({ type: SET_RECIPE_NAME_FILTER, payload: name });
});
test('should create a SET_RECIPE_TAGS_FILTER action object', () => {
  const tags = ['abc', '123'];
  const action = setRecipeNameFilter(tags);
  expect(action).toEqual({ type: SET_RECIPE_NAME_FILTER, payload: tags });
});
