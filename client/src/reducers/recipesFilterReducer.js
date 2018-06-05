import {
  SET_RECIPE_NAME_FILTER,
  SET_RECIPE_TAGS_FILTER,
  TOGGLE_RECIPE_TAG_FILTER,
} from '../actions/types';

export const recipesFilterDefaultState = {
  name: '',
  tags: [],
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
    default:
      return state;
  }
};
