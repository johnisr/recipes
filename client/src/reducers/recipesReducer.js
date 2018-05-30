import { POST_RECIPE } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case POST_RECIPE:
      return [...state, action.payload];
    default:
      return state;
  }
};
