import {
  POST_RECIPE,
  SET_RECIPES,
  DELETE_RECIPE,
  PATCH_RECIPE,
} from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case POST_RECIPE:
      return state ? [...state, action.payload] : [action.payload];
    case DELETE_RECIPE:
      return state.filter(recipe => recipe._id !== action.payload);
    case PATCH_RECIPE:
      return state.map(
        recipe =>
          recipe._id === action.id ? { ...recipe, ...action.payload } : recipe
      );
    case SET_RECIPES:
      return action.payload;
    default:
      return state;
  }
};
