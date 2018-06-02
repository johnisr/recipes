import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { RecipeList } from '../RecipeList/RecipeList';

export const Dashboard = props => {
  const { user, recipes } = props;
  return (
    <div>
      <h2>Dashboard</h2>
      <Segment clearing>
        {user && recipes && recipes.length === 0 ? (
          <h2>No Recipes Found</h2>
        ) : (
          <RecipeList recipes={props.recipes} />
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
    state.recipes.filter(recipe => recipe._user === state.auth._id),
});

export default connect(mapStateToProps)(Dashboard);
