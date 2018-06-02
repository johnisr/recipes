import axios from 'axios';
import { FETCH_USER, POST_RECIPE, SET_RECIPES, DELETE_RECIPE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const postRecipe = values => async dispatch => {
  const res = await axios.post('/api/recipes', values);

  dispatch({ type: POST_RECIPE, payload: res.data });
};

export const deleteRecipe = id => async dispatch => {
  await axios.delete(`/api/recipes/${id}`);

  dispatch({ type: DELETE_RECIPE, payload: id });
};

export const getRecipes = () => async dispatch => {
  const res = await axios.get('/api/recipes');

  dispatch({ type: SET_RECIPES, payload: res.data });
};
