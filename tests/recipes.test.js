const recipes = require('./fixtures/recipes');
const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe');

// instantiate database with recipes from fixture
let savedRecipes;
let recipesArray;
const usersArray = [];
beforeAll(async () => {
  savedRecipes = await Recipe.find({}).exec();
  await Recipe.remove({}).exec();

  recipesArray = recipes.map(
    (
      {
        name,
        summary,
        notes,
        cookingTime,
        preparationTime,
        category,
        ingredients,
        preparation,
        cooking,
        imageUrl,
      },
      index
    ) => {
      usersArray[index] = mongoose.Types.ObjectId();
      return new Recipe({
        _user: usersArray[index],
        name,
        summary,
        notes,
        cookingTime,
        preparationTime,
        category,
        ingredients,
        preparation,
        cooking,
        dateCreated: Date.now(),
        dateModified: Date.now(),
        isFinal: true,
        imageUrl,
      });
    }
  );
  await Recipe.insertMany(recipesArray);
});

afterAll(async () => {
  await Recipe.remove({}).exec();
  await Recipe.insertMany(savedRecipes);
});

const Page = require('./helpers/page');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000/recipes');
});

afterEach(async () => {
  await page.close();
});

describe('When not logged in', async () => {
  test('Can see recipes', async () => {
    const selector = '.card';
    await page.waitFor(selector);
    const cardsCount = await page.$$eval(selector, el => el.length);
    expect(cardsCount).not.toBe(0);
  });

  test('Cannot see add recipes button', async () => {
    const selector = 'a[href="/recipesNew"]';
    await page.waitFor('.card');
    const button = await page.$(selector);
    expect(button).toBeFalsy();
  });
});

describe('When logged in', async () => {
  beforeEach(async () => {
    await page.login();
    await page.goto('http://localhost:3000/recipes');
    await page.waitFor('.card');
  });

  test('Can see recipes', async () => {
    const selector = '.card';
    await page.waitFor(selector);
    const cardsCount = await page.$$eval(selector, el => el.length);
    expect(cardsCount).not.toBe(0);
  });

  test('Can see add recipes button', async () => {
    const selector = 'a[href="/recipesNew"]';
    await page.waitFor(selector);
    const button = await page.$(selector);
    expect(button).toBeTruthy();
  });

  describe('And adding a recipe', async () => {
    beforeEach(async () => {
      await page.waitFor('a[href="/recipesNew"]');
      await page.click('a[href="/recipesNew"]');
      await page.waitFor('form.ui.form');
    });

    test('Can see create recipe form', async () => {
      expect(await page.$('form.ui.form')).toBeTruthy();

      const url = await page.url();
      const parser = document.createElement('a');
      parser.href = url;
      expect(parser.pathname).toEqual('/recipesNew');
    });

    describe('With invalid inputs', () => {
      test('and submitting results in error message', async () => {
        await page.waitFor('button[type="submit"]');
        await page.click('button[type="submit"]');

        const selector = '.ui.red.message > .content > p';
        await page.waitFor(selector);
        const warning = await page.getContentsOf(selector);
        expect(warning).toEqual('Required fields missing');
      });

      test('and submitting results in three required labels', async () => {
        await page.waitFor('button[type="submit"]');
        await page.click('button[type="submit"]');

        const selector = '.ui.red.basic.label';
        await page.waitFor(selector);
        const requiredLabel = await page.getContentsOf(selector);
        expect(requiredLabel).toEqual('Required');

        const requiredLabelCount = await page.$$eval(selector, el => el.length);
        expect(requiredLabelCount).toEqual(3);
      });

      test('and submitting name results in error message and two required labels', async () => {
        await page.waitFor('input[name="name"]');
        await page.type('input[name="name"]', 'Recipe Name');
        await page.click('button[type="submit"]');

        const selector = '.ui.red.basic.label';
        await page.waitFor(selector);
        const requiredLabel = await page.getContentsOf(selector);
        expect(requiredLabel).toEqual('Required');

        const requiredLabelCount = await page.$$eval(selector, el => el.length);
        expect(requiredLabelCount).toEqual(2);
      });

      test('and submitting ingredient results in error message and two required labels', async () => {
        await page.waitFor('textarea[placeholder="Ingredients"]');
        await page.type(
          'textarea[placeholder="Ingredients"]',
          'Recipe Ingredients'
        );
        await page.click('button[type="submit"]');

        const selector = '.ui.red.basic.label';
        await page.waitFor(selector);
        const requiredLabel = await page.getContentsOf(selector);
        expect(requiredLabel).toEqual('Required');

        const requiredLabelCount = await page.$$eval(selector, el => el.length);
        expect(requiredLabelCount).toEqual(2);
      });

      test('and submitting instructions results in error message and two required labels', async () => {
        await page.waitFor('textarea[placeholder="Instructions"]');
        await page.type(
          'textarea[placeholder="Instructions"]',
          'Recipe Instructions'
        );
        await page.click('button[type="submit"]');

        const selector = '.ui.red.basic.label';
        await page.waitFor(selector);
        const requiredLabel = await page.getContentsOf(selector);
        expect(requiredLabel).toEqual('Required');

        const requiredLabelCount = await page.$$eval(selector, el => el.length);
        expect(requiredLabelCount).toEqual(2);
      });
    });

    describe('With valid inputs', () => {
      beforeEach(async () => {
        // wait for ingredients to show up before typing
        await page.waitFor('h3');
        await page.type('input[name="name"]', 'Recipe Name');
        await page.type(
          'textarea[placeholder="Ingredients"]',
          'Recipe Ingredients'
        );
        await page.type(
          'textarea[placeholder="Instructions"]',
          'Recipe Instructions'
        );
        await page.click('button[type="submit"]');
      });

      test('Submitting takes user to review screen', async () => {
        const title = await page.getContentsOf('h2');
        expect(title).toEqual('Review');
        const name = await page.getContentsOf('h1');
        expect(name).toEqual('Recipe Name');

        const ingredientBullet = await page.getContentsOf(
          '.ui.bulleted.list > .item'
        );
        expect(ingredientBullet).toEqual('Recipe Ingredients');

        const instructionBullet = await page.getContentsOf(
          '.ui.ordered.list > .item'
        );
        expect(instructionBullet).toEqual('Recipe Instructions');
      });

      test('Submitting then saving adds recipe to dashboard', async () => {
        await page.click('button.positive.right.button');
        const selector = '.card';

        await page.waitFor(selector);
        const cardsCount = await page.$$eval(selector, el => el.length);
        expect(cardsCount).toBe(1);

        expect(await page.getContentsOf('h2')).toBe('My Recipes');

        const name = await page.getContentsOf('.card > .content > .header');
        expect(name).toEqual('Recipe Name');
      });

      describe('And submitting then viewing recipe details', () => {
        beforeEach(async () => {
          await page.waitFor('button.positive.right.button');
          await page.click('button.positive.right.button');
          await page.waitFor('.card > .content > .header');
          page.click('.card > .content > .header');
          await page.waitFor('h1');
        });

        test('has recipe name, ingredients, and instructions', async () => {
          const name = await page.getContentsOf('h1');
          expect(name).toEqual('Recipe Name');

          const ingredientBullet = await page.getContentsOf(
            '.ui.bulleted.list > .item'
          );
          expect(ingredientBullet).toEqual('Recipe Ingredients');

          const instructionBullet = await page.getContentsOf(
            '.ui.ordered.list > .item'
          );
          expect(instructionBullet).toEqual('Recipe Instructions');
        });

        test('has back, edit, delete buttons', async () => {
          const backButton = await page.getContentsOf('button.positive');
          expect(backButton).toEqual('Back');
          const editButton = await page.getContentsOf('a.yellow.button');
          expect(editButton).toEqual('Edit');
          const deleteButton = await page.getContentsOf('button.negative');
          expect(deleteButton).toEqual('Delete');
        });

        test('back button leads back to dashboard', async () => {
          await page.waitFor('button.positive');
          page.click('button.positive');
          const selector = '.card';

          await page.waitFor(selector);
          const cardsCount = await page.$$eval(selector, el => el.length);
          expect(cardsCount).toBe(1);

          expect(await page.getContentsOf('h2')).toBe('My Recipes');

          const name = await page.getContentsOf('.card > .content > .header');
          expect(name).toEqual('Recipe Name');
        });

        test('edit button leads to edit form', async () => {
          await page.waitFor('a.yellow.button');
          page.click('a.yellow.button');
          await page.waitFor('form.ui.form');
          const name = await page.$eval('input[name="name"]', el => el.value);
          expect(name).toEqual('Recipe Name');

          const ingredients = await page.$eval(
            'textarea[placeholder="Ingredients"]',
            el => el.value
          );
          expect(ingredients).toEqual('Recipe Ingredients');

          const instructions = await page.$eval(
            'textarea[placeholder="Instructions"]',
            el => el.value
          );
          expect(instructions).toEqual('Recipe Instructions');
        });

        test('delete button leads back to empty dashboard', async () => {
          await page.waitFor('button.negative');
          page.click('button.negative');
          await page.waitFor('a[href="/recipesNew"]');
          expect(await page.getContentsOf('h2')).toBe('My Recipes');
          expect(await page.getContentsOf('.ui.segment > h2')).toEqual(
            'No Recipes Found'
          );
        });
      });
    });
  });
});
