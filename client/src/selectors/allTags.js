export const recipeTypes = [
  'soup',
  'appetizer',
  'salads',
  'bread',
  'beverage',
  'dessert',
  'main dish',
  'sauce',
  'side dish',
  'noodle',
];

export const mealTime = ['breakfast', 'lunch', 'dinner', 'brunch', 'snack'];

export const mealType = [
  'budget',
  'easy',
  'healthy',
  'quick',
  'one pot',
  'overnight',
];

export const prepMethod = [
  'instant pot',
  'grilling',
  'stove top',
  'oven',
  'baking',
  'no cook',
  'blender',
  'microwave',
  'slow cooker',
];

export const cuisine = [
  'mexican',
  'italian',
  'indian',
  'greek',
  'chinese',
  'thai',
  'french',
  'spanish',
  'german',
  'irish',
  'creole/cajun',
  'southern',
  'asian',
  'southwest/tex-mex',
  'african',
  'filipino',
];

export const ingredients = [
  'chicken',
  'beef',
  'ground beef',
  'pork',
  'ham',
  'seafood',
  'turkey',
  'pasta',
  'salmon',
  'ground pork',
];

export default [
  ...recipeTypes,
  ...cuisine,
  ...ingredients,
  ...mealTime,
  ...mealType,
  ...prepMethod,
];
