import {
  SET_CAROUSEL_NUM_LOADED_SLIDES,
  SET_CURRENT_SLIDE_INDEX,
} from '../actions/types';

export const defaultState = {
  numLoadedSlides: 3,
  seed: Math.floor(Math.random() * 100),
  currentSlideIndex: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CAROUSEL_NUM_LOADED_SLIDES:
      return { ...state, numLoadedSlides: action.payload };
    case SET_CURRENT_SLIDE_INDEX:
      return { ...state, currentSlideIndex: action.payload };
    default:
      return state;
  }
};
