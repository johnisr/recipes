import React from 'react';
import { Segment } from 'semantic-ui-react';
import RecipesFilter from '../RecipesFilter/RecipesFilter';
import RecipeList from '../RecipeList/RecipeList';

const Recipes = () => (
  <div>
    <RecipesFilter />

    <Segment clearing>
      <RecipeList />
    </Segment>
  </div>
);

export default Recipes;
