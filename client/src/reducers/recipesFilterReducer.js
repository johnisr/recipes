import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
} from '../actions/types';

export const recipesFilterDefaultState = {
  name: '',
  tags: [],
};

export default (state = recipesFilterDefaultState, action) => {
  switch (action.type) {
    case SET_RECIPE_NAME_FILTER:
      return { ...state, name: action.payload };
    case SET_RECIPE_TAGS_FILTER:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};
