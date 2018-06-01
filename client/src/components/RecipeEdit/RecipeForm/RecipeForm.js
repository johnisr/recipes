import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { Grid, Form, Button, Message } from 'semantic-ui-react';

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
    const { submitting, valid } = this.props;
    const { showAllErrors } = this.state;
    return (
      <Form onSubmit={e => this.onSubmit(e)}>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <Field
                name="name"
                required
                component={RecipeField}
                type="text"
                label="Name"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <Field
                name="summary"
                component={RecipeField}
                type="text"
                label="Summary"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <FieldArray
                name="ingredients"
                required
                component={RecipeFieldArray}
                label="Ingredients"
                sublabel="Ingredients"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <FieldArray
                name="preparation"
                component={RecipeFieldArray}
                label="Preparation"
                sublabel="Instructions"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <FieldArray
                name="cooking"
                required
                component={RecipeFieldArray}
                label="Cooking"
                sublabel="Instructions"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <FieldArray
                name="cookingTime"
                component={RecipeFieldTime}
                type="time"
                label="Cooking Time"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <FieldArray
                name="preparationTime"
                component={RecipeFieldTime}
                type="time"
                label="Preparation Time"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <Field
                name="notes"
                component={RecipeField}
                type="textarea"
                label="Notes"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <Field
                name="category"
                component={RecipeField}
                type="textarea"
                label="Categories"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated="left">
              <Button as={Link} to="/dashboard" negative>
                Cancel
              </Button>
            </Grid.Column>
            {showAllErrors &&
              !valid && (
                <Grid.Column>
                  <Message content="Required fields missing" color="red" />
                </Grid.Column>
              )}

            <Grid.Column floated="right">
              <Button
                floated="right"
                primary
                positive
                disabled={submitting}
                type="submit"
              >
                Next
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
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
