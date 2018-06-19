const Page = require('./helpers/page');

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('When not signed in, show Login button', async () => {
  const text = await page.getContentsOf('a[href="/auth/google"]');
  expect(text).toEqual('Login With Google');
});

test('Clicking login starts OAuth flow', async () => {
  await page.click('[href="/auth/google"');
  const url = await page.url();
  expect(url).toMatch(/^https:\/\/accounts\.google\.com/);
});

test('When signed in, show logout button', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual('Logout');
});

test('When not logged in, show Home, Recipes button', async () => {
  const homeText = await page.getContentsOf('a[href="/"]');
  expect(homeText).toEqual('Home');
  const recipesText = await page.getContentsOf('a[href="/recipes"]');
  expect(recipesText).toEqual('Recipes');
});

test('When not logged in, clicking Home redirects to /', async () => {
  await page.click('a[href="/"]');
  const url = await page.url();

  const parser = document.createElement('a');
  parser.href = url;
  expect(parser.pathname).toEqual('/');
});

test('When not logged in, clicking Recipes redirects to /recipes', async () => {
  await page.click('a[href="/recipes"]');
  const url = await page.url();

  const parser = document.createElement('a');
  parser.href = url;
  expect(parser.pathname).toEqual('/recipes');
});

test('When logged in, show Home, Recipes, and Dashboard button', async () => {
  await page.login();
  const homeText = await page.getContentsOf('a[href="/"]');
  expect(homeText).toEqual('Home');
  const recipesText = await page.getContentsOf('a[href="/recipes"]');
  expect(recipesText).toEqual('Recipes');
  const dashboardText = await page.getContentsOf('a[href="/dashboard"]');
  expect(dashboardText).toEqual('Dashboard');
});

test('When logged in, clicking Dashboard redirects to /dashboard', async () => {
  await page.login();
  await page.click('a[href="/dashboard"]');
  const url = await page.url();

  const parser = document.createElement('a');
  parser.href = url;
  expect(parser.pathname).toEqual('/dashboard');
});
