const request = require('supertest');
const app = require('../server');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const recipes = require('./fixtures/recipes');
const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe');

// instantiate database with recipes from fixture
let recipesArray;
beforeAll(async () => {
  await Recipe.remove({});
  recipesArray = recipes.map(
    ({
      name,
      summary,
      notes,
      cookingTime,
      preparationTime,
      category,
      ingredients,
      preparation,
      cooking,
    }) =>
      new Recipe({
        _user: mongoose.Types.ObjectId(),
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
      })
  );
  await Recipe.insertMany(recipesArray);
});

describe('When Logged out', () => {
  test('POST /api/recipes returns a 401', done => {
    request(app)
      .post('/api/recipes')
      .send(recipes[1])
      .expect(401)
      .expect(res => {
        expect(res.body.error).toEqual('You must log in');
      })
      .end(done);
  });

  test('GET /api/recipes returns a list of recipes', async done => {
    // const recipeObj = recipesArray.map(r => JSON.parse(JSON.stringify(r)));
    request(app)
      .get('/api/recipes')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(4);
        // expect(res.body).toEqual(recipeObj);
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
    // eslint-disable-next-line no-underscore-dangle
    await userFactory.deleteUser(user._id);
  });

  describe('POST /api/recipes', () => {
    test('With no recipe returns 422', done => {
      const body = {};
      request(app)
        .post('/api/recipes')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(body)
        .expect(422)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).toEqual({ error: 'Improper recipe format' });
          const recipe = await Recipe.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _user: { _id: user._id },
          }).exec();
          expect(recipe).toBeFalsy();
          return done();
        });
    });

    test('With no recipe name returns 422', done => {
      const body = { ...recipes[0] };
      delete body.name;
      request(app)
        .post('/api/recipes')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(body)
        .expect(422)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).toEqual({ error: 'Improper recipe format' });
          const recipe = await Recipe.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _user: { _id: user._id },
          }).exec();
          expect(recipe).toBeFalsy();
          return done();
        });
    });

    test('With no recipe ingredients returns 422', done => {
      const body = { ...recipes[2] };
      delete body.ingredients;
      request(app)
        .post('/api/recipes')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(body)
        .expect(422)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).toEqual({ error: 'Improper recipe format' });
          const recipe = await Recipe.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _user: { _id: user._id },
          }).exec();
          expect(recipe).toBeFalsy();
          return done();
        });
    });

    test('With no recipe cooking instructions returns 422', done => {
      const body = { ...recipes[1] };
      delete body.cooking;
      request(app)
        .post('/api/recipes')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(body)
        .expect(422)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).toEqual({ error: 'Improper recipe format' });
          const recipe = await Recipe.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _user: { _id: user._id },
          }).exec();
          expect(recipe).toBeFalsy();
          return done();
        });
    });

    test('With invalid recipe notes format returns 422', done => {
      const body = {
        ...recipes[3],
        notes: { note: 'notes is supposed to be an array' },
      };
      request(app)
        .post('/api/recipes')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(body)
        .expect(422)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).toEqual({ error: 'Improper recipe format' });
          const recipe = await Recipe.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _user: { _id: user._id },
          }).exec();
          expect(recipe).toBeFalsy();
          return done();
        });
    });

    test('With valid food returns a 200 and enters food', done => {
      request(app)
        .post('/api/recipes')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(recipes[1])
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).toMatchObject(recipes[1]);
          const recipe = await Recipe.findOne({
            // eslint-disable-next-line no-underscore-dangle
            _user: { _id: user._id },
            name: recipes[1].name,
          }).exec();
          expect(recipe).toBeTruthy();

          // Turn mongoose documents and subdocuments into an object
          recipe.ingredients.toObject();
          recipe.preparation.toObject();
          recipe.cooking.toObject();
          const recipeObj = recipe.toObject();

          Object.keys(recipes[1]).forEach(key => {
            if (recipeObj[key] instanceof Object) {
              expect(recipeObj[key]).toMatchObject(recipes[1][key]);
            } else {
              expect(recipeObj[key]).toEqual(recipes[1][key]);
            }
          });
          expect(recipeObj.dateCreated).toBeInstanceOf(Date);
          expect(recipeObj.dateModified).toBeInstanceOf(Date);
          expect(recipeObj.isFinal).toEqual(true);

          return done();
        });
    });
  });
});
