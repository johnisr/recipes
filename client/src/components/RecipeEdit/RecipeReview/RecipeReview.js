import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { postRecipe, patchRecipe } from '../../../actions/actions';
import { RecipeDetail } from '../../RecipeDetail/RecipeDetail';

const multiStringToArray = str =>
  str
    .split('\n')
    .map(val => val.trim())
    .filter(val => val);

const uniqueArray = arr => [...new Set(arr)];

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
  if (obj.category)
    obj.category = uniqueArray(multiStringToArray(obj.category));
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
  state = { file: null };
  onSubmit = async () => {
    const { formValues, history, onCancel, match } = this.props;
    try {
      const recipe = this.format(formValues);
      if (!recipe) throw new Error('Invalid form values');
      if (match.params.id) {
        await this.props.patchRecipe(match.params.id, recipe);
      } else {
        await this.props.postRecipe(recipe, this.state.file);
      }
      history.push('/dashboard');
    } catch (err) {
      onCancel();
    }
  };
  onFileChange = e => {
    const file = e.target.files[0];
    this.setState(() => ({ file }));
  };
  format = formValues => formatRecipe(formValues);
  render() {
    const { onCancel, formValues } = this.props;
    return (
      <div>
        <h2>Review</h2>
        {formValues && <RecipeDetail review recipe={this.format(formValues)} />}
        <div>
          <h5>Add an Image</h5>
          <input onChange={this.onFileChange} type="file" accept="image/*" />
        </div>
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
  postRecipe: (recipe, file) => dispatch(postRecipe(recipe, file)),
  patchRecipe: (id, updates) => dispatch(patchRecipe(id, updates)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(
  withRouter(RecipeReview)
);
