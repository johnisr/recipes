import { SET_RECIPE_NAME_FILTER } from '../actions/types';

export const recipesFilterDefaultState = {
  name: '',
};

export default (state = recipesFilterDefaultState, action) => {
  switch (action.type) {
    case SET_RECIPE_NAME_FILTER:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
