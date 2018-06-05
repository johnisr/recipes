import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
  SET_MAX_RECIPES_SHOWN,
  SET_RECIPES_PAGE_OFFSET,
} from './types';

export const setRecipeNameFilter = (name = '') => ({
  type: SET_RECIPE_NAME_FILTER,
  payload: name,
});

export const setRecipeTagsFilter = (tags = []) => ({
  type: SET_RECIPE_TAGS_FILTER,
  payload: tags,
});

export const toggleRecipeTagFilter = (tag = '') => ({
  type: TOGGLE_RECIPE_TAG_FILTER,
  payload: tag,
});

export const setMaxRecipesShown = (max = 10) => ({
  type: SET_MAX_RECIPES_SHOWN,
  payload: max,
});

export const setRecipesPageOffset = (offset = 0) => ({
  type: SET_RECIPES_PAGE_OFFSET,
  payload: offset,
});
