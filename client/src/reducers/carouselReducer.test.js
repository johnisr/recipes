import carouselReducer, { defaultState } from './carouselReducer';
import {
  SET_CAROUSEL_NUM_LOADED_SLIDES,
  SET_CURRENT_SLIDE_INDEX,
} from '../actions/types';

test('should set default state', () => {
  const state = carouselReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(defaultState);
});

test('should set numLoadedSlides', () => {
  const numLoadedSlides = 2;
  const action = {
    type: SET_CAROUSEL_NUM_LOADED_SLIDES,
    payload: numLoadedSlides,
  };
  const state = carouselReducer(undefined, action);
  expect(state.numLoadedSlides).toBe(numLoadedSlides);
});

test('should set currentSlideIndex', () => {
  const currentSlideIndex = 2;
  const action = { type: SET_CURRENT_SLIDE_INDEX, payload: currentSlideIndex };
  const state = carouselReducer(undefined, action);
  expect(state.currentSlideIndex).toEqual(currentSlideIndex);
});
