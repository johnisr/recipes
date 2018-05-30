import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import recipesReducer from './recipesReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  recipes: recipesReducer,
});
