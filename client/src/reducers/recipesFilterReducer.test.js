import recipesFilterReducer, {
  recipesFilterDefaultState,
} from './recipesFilterReducer';
import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
  SET_MAX_RECIPES_SHOWN,
  SET_RECIPES_PAGE_OFFSET,
  SET_SORT_BY,
  SORT_BY_USER_RATING,
  SORT_BY_TOTAL_RATING,
  SORT_BY_NEWEST,
  SORT_BY_OLDEST,
  SORT_BY_COOKING_TIME,
  SORT_BY_TOTAL_TIME,
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

test('should set recipes sortBy filter to user rating', () => {
  const action = { type: SET_SORT_BY, payload: SORT_BY_USER_RATING };
  const defaultState = {
    name: '',
    tags: [],
    sortBy: SORT_BY_TOTAL_RATING,
    maxRecipesShown: 12,
    offset: 0,
  };
  const state = recipesFilterReducer(defaultState, action);
  expect(state.sortBy).toEqual(SORT_BY_USER_RATING);
});

test('should set recipes sortBy filter to total rating', () => {
  const action = { type: SET_SORT_BY, payload: SORT_BY_TOTAL_RATING };
  const state = recipesFilterReducer(undefined, action);
  expect(state.sortBy).toEqual(SORT_BY_TOTAL_RATING);
});

test('should set recipes sortBy filter to newest', () => {
  const action = { type: SET_SORT_BY, payload: SORT_BY_NEWEST };
  const state = recipesFilterReducer(undefined, action);
  expect(state.sortBy).toEqual(SORT_BY_NEWEST);
});

test('should set recipes sortBy filter to oldest', () => {
  const action = { type: SET_SORT_BY, payload: SORT_BY_OLDEST };
  const state = recipesFilterReducer(undefined, action);
  expect(state.sortBy).toEqual(SORT_BY_OLDEST);
});

test('should set recipes sortBy filter to cooking time', () => {
  const action = { type: SET_SORT_BY, payload: SORT_BY_COOKING_TIME };
  const state = recipesFilterReducer(undefined, action);
  expect(state.sortBy).toEqual(SORT_BY_COOKING_TIME);
});

test('should set recipes sortBy filter to total time', () => {
  const action = { type: SET_SORT_BY, payload: SORT_BY_TOTAL_TIME };
  const state = recipesFilterReducer(undefined, action);
  expect(state.sortBy).toEqual(SORT_BY_TOTAL_TIME);
});
