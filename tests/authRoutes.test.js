const request = require('supertest');
const app = require('../server');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

describe('When Logged out', () => {
  test('GET /auth/google prompts redirect to OAuth login', done => {
    request(app)
      .get('/auth/google')
      .expect(302)
      .expect('location', /^https:\/\/accounts\.google\.com/)
      .end(done);
  });

  test('GET /auth/google/callback without proper info (code) redirects to google', done => {
    request(app)
      .get('/auth/google/callback')
      .expect(302)
      .expect('location', /^https:\/\/accounts\.google\.com/)
      .end(done);
  });

  test('GET /auth/logout prompts redirect to "/"', done => {
    request(app)
      .get('/auth/logout')
      .expect(302)
      .expect('location', '/')
      .end(done);
  });

  test('GET /auth/current_user returns nothing', done => {
    request(app)
      .get('/auth/current_user')
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('When Logged in', () => {
  let user;
  let session;
  let sig;
  beforeAll(async () => {
    user = await userFactory.createUser();
    ({ sig, session } = sessionFactory(user));
  });

  afterAll(async () => {
    await userFactory.deleteUser(user._id);
  });

  test('GET /auth/current_user returns user', done => {
    request(app)
      .get('/auth/current_user')
      .set('Cookie', `session=${session}; session.sig=${sig}`)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toMatch(user._id.toString());
      })
      .end(done);
  });

  test('GET /auth/logout redirects to /', done => {
    request(app)
      .get('/auth/logout')
      .set('Cookie', `session=${session}; session.sig=${sig}`)
      .expect(302)
      .expect('location', '/')
      .end(done);
  });

  test('GET /auth/google prompts redirect to OAuth login', done => {
    request(app)
      .get('/auth/google')
      .expect(302)
      .expect('location', /^https:\/\/accounts\.google\.com/)
      .end(done);
  });

  test('GET /auth/google/callback without proper info (code) redirects to google', done => {
    request(app)
      .get('/auth/google/callback')
      .expect(302)
      .expect('location', /^https:\/\/accounts\.google\.com/)
      .end(done);
  });
});
