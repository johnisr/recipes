import recipesReducer from './recipesReducer';
import { POST_RECIPE, SET_RECIPES, DELETE_RECIPE } from '../actions/types';
import recipes from '../tests/fixtures/recipes';

test('should set default state', () => {
  const state = recipesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(null);
});

test('should add recipe when POST_RECIPE called', () => {
  const recipe = recipes[2];
  const action = { type: POST_RECIPE, payload: recipe };
  const state = recipesReducer(undefined, action);
  expect(state).toEqual([recipe]);
});

test('should set recipes when SET_RECIPES called', () => {
  const action = { type: SET_RECIPES, payload: recipes };
  const state = recipesReducer(undefined, action);
  expect(state).toEqual(recipes);
});

test('should delete a recipe with id when DELETE_RECIPE called', () => {
  const recipesWithIds = recipes.map((recipe, index) => ({
    ...recipe,
    _id: index,
  }));
  const action = { type: DELETE_RECIPE, payload: 1 };
  const state = recipesReducer(recipesWithIds, action);
  expect(state.length).toEqual(recipesWithIds.length - 1);
  expect(state).not.toContain(recipesWithIds[1]);
});
