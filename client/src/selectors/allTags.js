export const allTags = {
  recipeType: [
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
  ],
  mealTime: ['breakfast', 'lunch', 'dinner', 'brunch', 'snack'],
  mealType: ['budget', 'easy', 'healthy', 'quick', 'one pot', 'overnight'],
  prepMethod: [
    'instant pot',
    'grilling',
    'stove top',
    'oven',
    'baking',
    'no cook',
    'blender',
    'microwave',
    'slow cooker',
    'steamer',
    'deep fry',
    'saute',
    'stew',
  ],
  cuisine: [
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
  ],
  ingredients: [
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
  ],
};

export const categories = {
  recipeType: { name: 'recipe type', color: 'red' },
  cuisine: { name: 'cuisine', color: 'yellow' },
  ingredients: { name: 'ingredients', color: 'green' },
  mealTime: { name: 'meal time', color: 'blue' },
  mealType: { name: 'meal type', color: 'orange' },
  prepMethod: { name: 'prep method', color: 'violet' },
};

export const tagToDisplayOption = tag => {
  let color = 'grey';
  Object.keys(categories).forEach(key => {
    if (allTags[key].includes(tag)) {
      ({ color } = categories[key]);
    }
  });
  return {
    key: tag,
    value: tag,
    text: tag,
    color,
  };
};

export const tagToRenderLabel = tag => {
  let color = 'grey';
  Object.keys(categories).forEach(key => {
    if (allTags[key].includes(tag.text)) {
      ({ color } = categories[key]);
    }
  });
  return {
    color,
    content: tag.text,
  };
};

export const tagsToDisplayOptions = tags =>
  tags.map(tag => {
    const tagInfo = tagToDisplayOption(tag);
    return {
      ...tagInfo,
      label: { color: tagInfo.color, empty: true, circular: true },
    };
  });

// arrays within object properties into one array
export const allTagsOptions = Object.keys(allTags).reduce(
  (prev, curr) => [
    ...prev,
    ...allTags[curr].sort().reduce(
      (p, c) => [
        ...p,
        {
          key: c,
          text: `${categories[curr].name}: ${c}`,
          value: c,
          label: {
            color: categories[curr].color,
            empty: true,
            circular: true,
          },
        },
      ],
      []
    ),
  ],
  []
);
