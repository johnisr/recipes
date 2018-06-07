import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';
import recipesFilterReducer from './recipesFilterReducer';
import carouselReducer from './carouselReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  recipes: recipesReducer,
  recipesFilter: recipesFilterReducer,
  carousel: carouselReducer,
});
