import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { postRecipe } from '../../../actions/actions';
import { RecipeDetail } from '../../RecipeDetail/RecipeDetail';

const multiStringToArray = str =>
  str
    .split('\n')
    .map(val => val.trim())
    .filter(val => val);

const arrayToNumber = arr => {
  if (!arr[0]) return 0;
  return arr.reduce((prev, curr) => {
    let total = prev;
    if (curr.seconds) total += +curr.seconds;
    if (curr.minutes) total += +curr.minutes * 60;
    if (curr.hours) total += +curr.hours * 60 * 60;
    if (curr.days) total += +curr.days * 60 * 60 * 24;
    return total;
  }, 0);
};

const formatRecipe = recipeValues => {
  const obj = JSON.parse(JSON.stringify(recipeValues));
  if (obj.notes) obj.notes = multiStringToArray(obj.notes);
  if (obj.category) obj.category = multiStringToArray(obj.category);
  if (obj.preparation) {
    obj.preparation.forEach((section, index) => {
      if (section) {
        obj.preparation[index].body = multiStringToArray(
          obj.preparation[index].body
        );
      }
    });
  }
  if (!obj.ingredients) {
    return null;
  }
  obj.ingredients.forEach((section, index) => {
    if (section) {
      obj.ingredients[index].body = multiStringToArray(
        obj.ingredients[index].body
      );
    }
  });
  if (!obj.cooking) {
    return null;
  }
  obj.cooking.forEach((section, index) => {
    if (section) {
      obj.cooking[index].body = multiStringToArray(obj.cooking[index].body);
    }
  });
  obj.cookingTime = arrayToNumber(obj.cookingTime);
  obj.preparationTime = arrayToNumber(obj.preparationTime);
  return obj;
};

export class RecipeReview extends Component {
  onSubmit = async () => {
    const { formValues, history, onCancel } = this.props;
    try {
      const recipe = this.format(formValues);
      if (!recipe) throw new Error('Invalid form values');
      await this.props.postRecipe(recipe);
      history.push('/dashboard');
    } catch (err) {
      onCancel();
    }
  };
  format = formValues => formatRecipe(formValues);
  render() {
    const { onCancel, formValues } = this.props;
    return (
      <div>
        <h2>Review</h2>
        {formValues && <RecipeDetail review recipe={this.format(formValues)} />}
        <Button onClick={() => onCancel()}>Back</Button>
        <Button positive icon floated="right" onClick={this.onSubmit}>
          Submit Recipe
          <Icon name="mail" />
        </Button>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  formValues: state.form.recipeForm.values,
});

const mapDispatchToProps = dispatch => ({
  postRecipe: recipe => dispatch(postRecipe(recipe)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(
  withRouter(RecipeReview)
);
