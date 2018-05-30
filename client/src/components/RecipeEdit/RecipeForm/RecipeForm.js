import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';

import RecipeField from './RecipeField/RecipeField';
import RecipeFieldTime from './RecipeFieldTime/RecipeFieldTime';
import RecipeFieldArray from './RecipeFieldArray/RecipeFieldArray';

export class RecipeForm extends Component {
  state = { showAllErrors: false };
  onSubmit = e => {
    e.preventDefault();
    const { onRecipeSubmit, valid } = this.props;
    if (valid) {
      onRecipeSubmit();
    } else {
      this.setState(() => ({ showAllErrors: true }));
    }
  };
  render() {
    const { submitting } = this.props;
    return (
      <div className="row">
        <form onSubmit={e => this.onSubmit(e)}>
          <Field
            name="name"
            component={RecipeField}
            type="text"
            label="Name"
            showAllErrors={this.state.showAllErrors}
          />
          <Field
            name="summary"
            component={RecipeField}
            type="text"
            label="Summary"
            showAllErrors={this.state.showAllErrors}
          />
          <Field
            name="notes"
            component={RecipeField}
            type="textarea"
            label="Notes Section"
            showAllErrors={this.state.showAllErrors}
          />
          <div className="row">
            <div className="col s4">
              <FieldArray
                classname="col s4"
                name="cookingTime"
                component={RecipeFieldTime}
                type="time"
                label="Cooking Time"
                showAllErrors={this.state.showAllErrors}
              />
            </div>
            <div className="col s4">
              <FieldArray
                classname="col s4"
                name="preparationTime"
                component={RecipeFieldTime}
                type="time"
                label="Preparation Time"
                showAllErrors={this.state.showAllErrors}
              />
            </div>
            <div className="col s4">
              <Field
                classname="col s4"
                name="category"
                component={RecipeField}
                type="textarea"
                label="Categories"
                showAllErrors={this.state.showAllErrors}
              />
            </div>
          </div>
          <div style={{ marginBottom: '60px' }}>
            <FieldArray
              name="ingredients"
              required
              component={RecipeFieldArray}
              label="Ingredients"
              sublabel="Ingredients"
              showAllErrors={this.state.showAllErrors}
            />
          </div>
          <div style={{ marginBottom: '60px' }}>
            <FieldArray
              name="preparation"
              component={RecipeFieldArray}
              label="Preparation"
              sublabel="Instructions"
              showAllErrors={this.state.showAllErrors}
            />
          </div>
          <div>
            <FieldArray
              name="cooking"
              required
              component={RecipeFieldArray}
              label="Cooking"
              sublabel="Instructions"
              showAllErrors={this.state.showAllErrors}
            />
          </div>
          <Link to="/dashboard" className="red btn-flat white-text">
            Cancel
          </Link>
          <button
            className="teal btn-flat right white-text"
            disabled={submitting}
            type="submit"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.ingredients || !values.ingredients.length) {
    errors.ingredients = {
      _error: 'At least one ingredient section must be entered',
    };
  } else {
    const ingredientArrayErrors = [];
    values.ingredients.forEach((ingredient, index) => {
      const ingredientErrors = {};
      if (!ingredient || !ingredient.body) {
        ingredientErrors.body = 'Required';
        ingredientArrayErrors[index] = ingredientErrors;
      }

      return ingredientErrors;
    });
    if (ingredientArrayErrors.length) {
      errors.ingredients = ingredientArrayErrors;
    }
  }
  if (!values.cooking || !values.cooking.length) {
    errors.cooking = {
      _error: 'At least one cooking section must be entered',
    };
  } else {
    const cookingArrayErrors = [];
    values.cooking.forEach((ingredient, index) => {
      const cookingErrors = {};
      if (!ingredient || !ingredient.body) {
        cookingErrors.body = 'Required';
        cookingArrayErrors[index] = cookingErrors;
      }

      return cookingErrors;
    });
    if (cookingArrayErrors.length) {
      errors.cooking = cookingArrayErrors;
    }
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'recipeForm',
  destroyOnUnmount: false,
})(RecipeForm);
