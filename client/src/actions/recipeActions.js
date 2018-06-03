import axios from 'axios';
import { POST_RECIPE, SET_RECIPES, DELETE_RECIPE, PATCH_RECIPE } from './types';

export const postRecipe = (values, file) => async dispatch => {
  let uploadConfig;
  if (file) {
    uploadConfig = await axios.get('/api/upload');
    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  }
  const res = await axios.post('/api/recipes', {
    ...values,
    imageUrl: [uploadConfig ? uploadConfig.data.key : null],
  });

  dispatch({ type: POST_RECIPE, payload: res.data });
};

export const deleteRecipe = id => async dispatch => {
  await axios.delete(`/api/recipes/${id}`);

  dispatch({ type: DELETE_RECIPE, payload: id });
};

export const patchRecipe = (id, updates) => async dispatch => {
  const res = await axios.patch(`/api/recipes/${id}`, updates);

  dispatch({ type: PATCH_RECIPE, id, payload: res.data });
};

export const getRecipes = () => async dispatch => {
  const res = await axios.get('/api/recipes');

  dispatch({ type: SET_RECIPES, payload: res.data });
};
