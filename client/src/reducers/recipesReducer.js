import { POST_RECIPE, SET_RECIPES } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case POST_RECIPE:
      return state ? [...state, action.payload] : [action.payload];
    case SET_RECIPES:
      return action.payload;
    default:
      return state;
  }
};
