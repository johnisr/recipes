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
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('Should see image after loading', async () => {
  const selector = '.carousel__image--success';
  await page.waitFor(selector);
  const image = await page.$eval(selector, el => el.src);
  expect(image).toBeTruthy();
});

test('Should see 3 slider dots on load and 1st one active', async () => {
  const selector = '.carousel__dot';
  await page.waitFor(selector);
  const dotsCount = await page.$$eval(selector, el => el.length);
  expect(dotsCount).toEqual(3);
  const activeDot = await page.getContentsOf(
    '.carousel__dot--selected.carousel__dot--0'
  );
  expect(activeDot).toEqual('');
});

test('Should see 4 slider dots after clicking on 2nd one', async () => {
  const selector = '.carousel__dot';
  await page.waitFor(selector);
  await page.click('.carousel__dot--1');
  const dotsCount = await page.$$eval(selector, el => el.length);
  expect(dotsCount).toEqual(4);
});

test('Should move active dot right after clicking next button', async () => {
  const buttonSelector = '.carousel__next-button';
  await page.waitFor(buttonSelector);
  await page.click(buttonSelector);
  const dotsCount = await page.$$eval('.carousel__dot', el => el.length);
  expect(dotsCount).toEqual(4);
  const activeDot = await page.getContentsOf(
    '.carousel__dot--selected.carousel__dot--1'
  );
  expect(activeDot).toEqual('');
});

test('Should move active dot left after clicking back button', async () => {
  const nextButton = '.carousel__next-button';
  await page.waitFor(nextButton);
  await page.click(nextButton);
  const dotsCount = await page.$$eval('.carousel__dot', el => el.length);
  expect(dotsCount).toEqual(4);
  const activeDot = await page.getContentsOf(
    '.carousel__dot--selected.carousel__dot--1'
  );
  expect(activeDot).toEqual('');
  await page.click('.carousel__back-button');
  const newActiveDot = await page.getContentsOf(
    '.carousel__dot--selected.carousel__dot--0'
  );
  expect(newActiveDot).toEqual('');
});
