import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { RecipeList } from '../RecipeList/RecipeList';
import RecipesFilter from '../RecipesFilter/RecipesFilter';
import selectRecipesWithPages from '../../selectors/recipesWithPages';
import { toggleRecipeTagFilter } from '../../actions/actions';

export const Dashboard = props => {
  const { user, recipes } = props;
  return (
    <div>
      <RecipesFilter dashboard />
      <h2>My Recipes</h2>
      <Segment clearing>
        {user && recipes && recipes.length === 0 ? (
          <h2>No Recipes Found</h2>
        ) : (
          <RecipeList
            recipes={props.recipes}
            toggleRecipeTagFilter={props.toggleRecipeTagFilter}
          />
        )}
        <Button
          icon
          positive
          circular
          as={Link}
          to="/recipesNew"
          floated="right"
        >
          <Icon name="add" size="large" />
        </Button>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth && state.auth._id,
  recipes:
    state.recipes &&
    state.auth &&
    selectRecipesWithPages(
      state.recipes.filter(recipe => recipe._user === state.auth._id),
      state.recipesFilter,
      state.auth
    ),
});

const mapDispatchToProps = dispatch => ({
  toggleRecipeTagFilter: tag => dispatch(toggleRecipeTagFilter(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
