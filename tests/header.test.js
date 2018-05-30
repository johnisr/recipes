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
  await page.click('a[href="/auth/google"');
  const url = await page.url();
  expect(url).toMatch(/^https:\/\/accounts\.google\.com/);
});

test('When signed in, show logout button', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual('Logout');
});
