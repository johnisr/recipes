const Page = require('./helpers/page');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('Should see Loading image', async () => {
  const selector = '.carousel__image';
  await page.waitFor(selector);
  const image = await page.getContentsOf('.loader');
  expect(image).toBe('Loading');
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

test('Should see 5 slider dots after clicking on 3rd one', async () => {
  const selector = '.carousel__dot';
  await page.waitFor(selector);
  await page.click('.carousel__dot--2');
  const dotsCount = await page.$$eval(selector, el => el.length);
  expect(dotsCount).toEqual(5);
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
