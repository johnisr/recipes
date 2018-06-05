export default (recipes, { name, tags }) =>
  recipes.filter(recipe => {
    // console.log(recipe);
    const nameMatch = recipe.name.toLowerCase().includes(name.toLowerCase());
    const tagsMatch =
      tags.length === 0 || tags.every(tag => recipe.category.indexOf(tag) > -1);
    // console.log(nameMatch, tagsMatch);
    return nameMatch && tagsMatch;
  });
