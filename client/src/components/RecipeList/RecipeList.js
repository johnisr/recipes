import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class RecipeList extends Component {
  componentDidMount() {}
  render() {
    const { recipes } = this.props;
    console.log(recipes);
    if (!recipes) {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
    return (
      <div className="row">
        {recipes.map(recipe => (
          // eslint-disable-next-line no-underscore-dangle
          <div key={recipe._id} className="col s12 m6 l4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{recipe.name}</span>
                <p>{recipe.summary}</p>
              </div>
              <div className="card-action">
                <Link to="/recipes">Information here</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps)(RecipeList);
