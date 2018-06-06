import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

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
                name="preparationTime"
                component={RecipeFieldTime}
                type="time"
                label="Preparation Time"
                showAllErrors={this.state.showAllErrors}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <FieldArray
                name="cookingTime"
                component={RecipeFieldTime}
                type="time"
                label="Cooking Time"
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
              <FieldArray
                name="category"
                component={RecipeField}
                type="category"
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

const timeToArrayObj = time => {
  let timeLeft = time;
  const days = Math.floor(timeLeft / (60 * 60 * 24));
  timeLeft %= 60 * 60 * 24;
  const hours = Math.floor(timeLeft / (60 * 60));
  timeLeft %= 60 * 60;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return [{ days, hours, minutes, seconds }];
};

const joinBodyArrays = sections =>
  sections.map(section => ({
    title: section.title,
    body: section.body.join('\n'),
  }));

const recipeToForm = recipe => {
  if (!recipe) return recipe;
  const {
    notes,
    category,
    name,
    summary,
    cookingTime,
    preparationTime,
    cooking,
    ingredients,
    preparation,
    imageUrl,
  } = recipe;
  const formValues = {};

  if (notes) formValues.notes = notes.join('\n');
  if (category) formValues.category = category;
  if (name) formValues.name = name;
  if (summary) formValues.summary = summary;
  if (cookingTime) formValues.cookingTime = timeToArrayObj(cookingTime);
  if (preparationTime)
    formValues.preparationTime = timeToArrayObj(preparationTime);
  if (cooking) formValues.cooking = joinBodyArrays(cooking);
  if (ingredients) formValues.ingredients = joinBodyArrays(ingredients);
  if (preparation) formValues.preparation = joinBodyArrays(preparation);
  if (imageUrl) formValues.imageUrl = imageUrl;
  return formValues;
};

const mapStateToProps = (state, props) => ({
  user: state.auth && state.auth._id,
  initialValues:
    state.recipes &&
    state.auth &&
    recipeToForm(
      state.recipes.find(
        recipe =>
          recipe._id === props.match.params.id &&
          recipe._user === state.auth._id
      )
    ),
});

export default withRouter(
  connect(mapStateToProps)(
    reduxForm({
      validate,
      form: 'recipeForm',
      destroyOnUnmount: false,
    })(RecipeForm)
  )
);
