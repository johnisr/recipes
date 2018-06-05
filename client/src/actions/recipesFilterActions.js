import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
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
