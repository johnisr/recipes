import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { postRecipe, getRecipes, deleteRecipe, patchRecipe } from './actions';
import { POST_RECIPE, SET_RECIPES, DELETE_RECIPE, PATCH_RECIPE } from './types';
import recipes from '../tests/fixtures/recipes';

const mockStore = configureMockStore([thunk]);

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

test('dispatches a FETCH_USER action after dispatching fetchUser', async () => {
  const recipe = recipes[1];
  moxios.stubRequest('/api/recipes', {
    status: 200,
    response: recipe,
  });

  const store = mockStore({ auth: null });

  await store.dispatch(postRecipe(recipe));
  expect(store.getActions()).toEqual([
    {
      type: POST_RECIPE,
      payload: recipe,
    },
  ]);
});
test('dispatches a SET_RECIPES action after dispatching getRecipes', async () => {
  moxios.stubRequest('/api/recipes', {
    status: 200,
    response: recipes,
  });

  const store = mockStore({ auth: null });

  await store.dispatch(getRecipes());
  expect(store.getActions()).toEqual([
    {
      type: SET_RECIPES,
      payload: recipes,
    },
  ]);
});
test('dispatches a DELETE_RECIPE action after dispatching deleteRecipe', async () => {
  const id = '123456789';
  moxios.stubRequest(`/api/recipes/${id}`, {
    status: 200,
    response: recipes[1],
  });

  const store = mockStore({ auth: null });

  await store.dispatch(deleteRecipe(id));
  expect(store.getActions()).toEqual([
    {
      type: DELETE_RECIPE,
      payload: id,
    },
  ]);
});
test('dispatches a PATCH_RECIPE action after dispatching patchRecipe', async () => {
  const id = '123456789';
  const updates = { name: 'new name', summary: 'new summary' };
  moxios.stubRequest(`/api/recipes/${id}`, {
    status: 200,
    response: { ...recipes[1], ...updates },
  });

  const store = mockStore({ auth: null });

  await store.dispatch(patchRecipe(id, updates));
  expect(store.getActions()).toEqual([
    {
      type: PATCH_RECIPE,
      id,
      payload: { ...recipes[1], ...updates },
    },
  ]);
});
