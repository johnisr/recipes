import recipesFilterReducer, {
  recipesFilterDefaultState,
} from './recipesFilterReducer';
import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
  SET_MAX_RECIPES_SHOWN,
  SET_RECIPES_PAGE_OFFSET,
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

test('should add a recipe tag if not in tags filter', () => {
  const tags = ['hello', 'tags'];
  const tag = 'world';
  const action = { type: TOGGLE_RECIPE_TAG_FILTER, payload: tag };
  const state = recipesFilterReducer({ name: '', tags }, action);
  expect(state.tags).toEqual([...tags, tag]);
});

test('should remove a recipe tag if in tags filter', () => {
  const tags = ['hello', 'tags'];
  const tag = 'hello';
  const action = { type: TOGGLE_RECIPE_TAG_FILTER, payload: tag };
  const state = recipesFilterReducer({ name: '', tags }, action);
  expect(state.tags).toEqual(['tags']);
});

test('should set max recipes shown filter', () => {
  const payload = 32;
  const action = { type: SET_MAX_RECIPES_SHOWN, payload };
  const state = recipesFilterReducer(undefined, action);
  expect(state.maxRecipesShown).toEqual(payload);
});

test('should set recipes page offset filter', () => {
  const payload = 1;
  const action = { type: SET_RECIPES_PAGE_OFFSET, payload };
  const state = recipesFilterReducer(undefined, action);
  expect(state.offset).toEqual(payload);
});
