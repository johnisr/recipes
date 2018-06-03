// Goes through all recipes, adds it to array. Sorted and turned into a set to
// get all unique instances and then spread back into an array
export default recipes => [
  ...new Set(
    recipes
      .reduce(
        (prev, curr) => (curr.category ? [...prev, ...curr.category] : prev),
        []
      )
      .sort((a, b) => a > b)
  ),
];
