import { SET_RECIPE_NAME_FILTER } from './types';

export const setRecipeNameFilter = (name = '') => ({
  type: SET_RECIPE_NAME_FILTER,
  payload: name,
});
