import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
  SET_MAX_RECIPES_SHOWN,
  SET_RECIPES_PAGE_OFFSET,
  SET_SORT_BY,
  SORT_BY_USER_RATING,
  SORT_BY_TOTAL_RATING,
} from './types';
import {
  setRecipeNameFilter,
  setRecipeTagsFilter,
  toggleRecipeTagFilter,
  setMaxRecipesShown,
  setRecipesPageOffset,
  setSortBy,
} from './recipesFilterActions';

test('should create a SET_RECIPE_NAME_FILTER action object', () => {
  const name = 'abc';
  const action = setRecipeNameFilter(name);
  expect(action).toEqual({ type: SET_RECIPE_NAME_FILTER, payload: name });
});
test('should create a SET_RECIPE_TAGS_FILTER action object', () => {
  const tags = ['abc', '123'];
  const action = setRecipeTagsFilter(tags);
  expect(action).toEqual({ type: SET_RECIPE_TAGS_FILTER, payload: tags });
});

test('should create a TOGGLE_RECIPE_TAG_FILTER action object', () => {
  const tag = 'hello';
  const action = toggleRecipeTagFilter(tag);
  expect(action).toEqual({ type: TOGGLE_RECIPE_TAG_FILTER, payload: tag });
});
test('should create a SET_MAX_RECIPES_SHOWN action object', () => {
  const payload = 10;
  const action = setMaxRecipesShown(payload);
  expect(action).toEqual({ type: SET_MAX_RECIPES_SHOWN, payload });
});
test('should create a SET_RECIPES_PAGE_OFFSET action object', () => {
  const payload = 5;
  const action = setRecipesPageOffset(payload);
  expect(action).toEqual({ type: SET_RECIPES_PAGE_OFFSET, payload });
});

test('should create a SET_SORT_BY action object with default values', () => {
  const action = setSortBy();
  expect(action).toEqual({ type: SET_SORT_BY, payload: SORT_BY_TOTAL_RATING });
});
test('should create a SET_SORT_BY action object', () => {
  const action = setSortBy(SORT_BY_USER_RATING);
  expect(action).toEqual({ type: SET_SORT_BY, payload: SORT_BY_USER_RATING });
});
