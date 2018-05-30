import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import RecipeForm from './RecipeForm/RecipeForm';
import RecipeReview from './RecipeReview/RecipeReview';

export class RecipeEdit extends Component {
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <RecipeReview
          onCancel={() => this.setState(() => ({ showFormReview: false }))}
        />
      );
    }
    return (
      <RecipeForm
        onRecipeSubmit={() => this.setState(() => ({ showFormReview: true }))}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: 'recipeForm' })(RecipeEdit);
