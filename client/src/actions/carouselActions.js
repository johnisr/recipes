import {
  SET_CAROUSEL_NUM_LOADED_SLIDES,
  SET_CURRENT_SLIDE_INDEX,
} from './types';

export const setCarouselNumLoadedSlides = (numLoadedSlides = 3) => ({
  type: SET_CAROUSEL_NUM_LOADED_SLIDES,
  payload: numLoadedSlides,
});

export const setCurrentSlideIndex = (currentSlideIndex = 0) => ({
  type: SET_CURRENT_SLIDE_INDEX,
  payload: currentSlideIndex,
});
