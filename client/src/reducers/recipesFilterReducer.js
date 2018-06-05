import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
  SET_MAX_RECIPES_SHOWN,
  SET_RECIPES_PAGE_OFFSET,
  SET_SORT_BY,
  SORT_BY_TOTAL_RATING,
} from '../actions/types';

export const recipesFilterDefaultState = {
  name: '',
  tags: [],
  sortBy: SORT_BY_TOTAL_RATING,
  maxRecipesShown: 12,
  offset: 0,
};

export default (state = recipesFilterDefaultState, action) => {
  switch (action.type) {
    case SET_RECIPE_NAME_FILTER:
      return { ...state, name: action.payload };
    case TOGGLE_RECIPE_TAG_FILTER: {
      const found = state.tags.includes(action.payload);
      return {
        ...state,
        tags: found
          ? state.tags.filter(tag => tag !== action.payload)
          : [...state.tags, action.payload],
      };
    }
    case SET_RECIPE_TAGS_FILTER:
      return { ...state, tags: action.payload };
    case SET_MAX_RECIPES_SHOWN:
      return { ...state, maxRecipesShown: action.payload };
    case SET_RECIPES_PAGE_OFFSET:
      return { ...state, offset: action.payload };
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};
