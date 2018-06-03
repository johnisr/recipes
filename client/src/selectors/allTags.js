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
  'Mexican',
  'Italian',
  'Indian',
  'Greek',
  'Chinese',
  'Thai',
  'French',
  'Spanish',
  'German',
  'Irish',
  'Creole/Cajun',
  'Southern',
  'Asian',
  'Southwest/Tex-Mex',
  'African',
  'Filipino',
];

export const ingredients = [
  'Chicken',
  'Beef',
  'Ground Beef',
  'Pork',
  'Ham',
  'Seafood',
  'Turkey',
  'Pasta',
];

export default [
  ...recipeTypes,
  ...cuisine,
  ...ingredients,
  ...mealTime,
  ...mealType,
  ...prepMethod,
];
