import selectRecipes from './recipes';

export default (
  recipes,
  { name, tags, maxRecipesShown, offset, sortBy },
  { _id = null }
) =>
  selectRecipes(
    recipes,
    { name, tags, maxRecipesShown, offset, sortBy },
    { _id }
  ).slice(offset * maxRecipesShown, offset * maxRecipesShown + maxRecipesShown);
