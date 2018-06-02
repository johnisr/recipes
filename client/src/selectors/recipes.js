export default (recipes, { name }) => {
  return recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(name.toLowerCase());
    return nameMatch;
  });
};
