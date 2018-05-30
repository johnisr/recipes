import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postRecipe } from '../../../actions/actions';

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
  obj.ingredients.forEach((section, index) => {
    if (section) {
      obj.ingredients[index].body = multiStringToArray(
        obj.ingredients[index].body
      );
    }
  });
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
      const recipe = formatRecipe(formValues);
      await this.props.postRecipe(recipe);
      history.push('/dashboard');
    } catch (err) {
      onCancel();
    }
  };
  render() {
    const { onCancel } = this.props;
    return (
      <div>
        <button
          className="yellow white-text darken-3 btn-flat"
          onClick={() => onCancel()}
        >
          Back
        </button>
        <button
          className="green white-text btn-flat right"
          onClick={this.onSubmit}
        >
          Submit Recipe
          <i className="material-icons right">email</i>
        </button>
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
