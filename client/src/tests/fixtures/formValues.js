// prettier-ignore
export default [
  {
    request: {
      "cookingTime": [
        {
          "days": "1",
          "hours": "0",
          "minutes": "0",
          "seconds": "0"
        }
      ],
      "preparationTime": [
        {
          "hours": "1",
          "minutes": "1",
          "seconds": "1"
        }
      ],
      "ingredients": [
        {
          "title": "main",
          "body": "2 eggs\n2 ham\n1 tomato"
        }
      ],
      "cooking": [
        {
          "title": "main",
          "body": "saute all ingredients"
        }
      ],
      "name": "Test Recipe",
      "summary": "A test recipe",
      "notes": "Some notes\nAbout the test recipe",
      "category": "test\nanother test"
    },
    response: {
      category: ['test', 'another test'],
      cooking: [{ body: ['saute all ingredients'], title: 'main' }],
      cookingTime: 86400,
      ingredients: [{ body: ['2 eggs', '2 ham', '1 tomato'], title: 'main' }],
      name: 'Test Recipe',
      notes: ['Some notes', 'About the test recipe'],
      preparationTime: 3661,
      summary: 'A test recipe',
    },
  },
];
