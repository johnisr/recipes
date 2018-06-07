import {
  setCarouselNumLoadedSlides,
  setCurrentSlideIndex,
} from './carouselActions';
import {
  SET_CAROUSEL_NUM_LOADED_SLIDES,
  SET_CURRENT_SLIDE_INDEX,
} from './types';

test('should create a SET_CAROUSEL_NUM_LOADED_SLIDES action object', () => {
  const numLoadedSlides = 3;
  const action = setCarouselNumLoadedSlides(numLoadedSlides);
  expect(action).toEqual({
    type: SET_CAROUSEL_NUM_LOADED_SLIDES,
    payload: numLoadedSlides,
  });
});

test('should create a SET_CURRENT_SLIDE_INDEX action object', () => {
  const currentSlideIndex = 3;
  const action = setCurrentSlideIndex(currentSlideIndex);
  expect(action).toEqual({
    type: SET_CURRENT_SLIDE_INDEX,
    payload: currentSlideIndex,
  });
});
