const request = require('supertest');
const app = require('../server');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
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
      });
    }
  );
  await Recipe.insertMany(recipesArray);
});

afterAll(async () => {
  await Recipe.remove({}).exec();
  await Recipe.insertMany(savedRecipes);
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

  test('DELETE /api/recipes/:id returns a 401', async done => {
    const { id } = recipesArray[1];
    request(app)
      .delete(`/api/recipes/${id}`)
      .send()
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({ error: 'You must log in' });
      })
      .end(done);
  });

  test('PATCH /api/recipes/:id returns a 401', async done => {
    const { id } = recipesArray[1];
    const update = {
      ...recipesArray[1],
      name: 'new name',
      summary: 'new summary',
    };
    request(app)
      .delete(`/api/recipes/${id}`)
      .send(update)
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({ error: 'You must log in' });
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

          const allRecipes = await Recipe.find({}).exec();
          expect(allRecipes.length).toBe(5);

          const recipe = await Recipe.findOne({
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

          const cleanup = await Recipe.findOneAndRemove({
            _user: { _id: user._id },
            name: recipes[1].name,
          });
          expect(cleanup).toBeTruthy();

          return done();
        });
    });
  });

  describe('PATCH /api/recipes/:id', () => {
    test('should not edit an invalid id recipe', async done => {
      const id = '123';
      const update = {
        ...recipesArray[1],
        name: 'new name',
        summary: 'new summary',
      };
      request(app)
        .patch(`/api/recipes/${id}`)
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(update)
        .expect(404)
        .expect(res => {
          expect(res.body).toEqual({ error: 'Invalid recipe id' });
        })
        .end(async err => {
          if (err) done(err);
          const recipe = await Recipe.findOne({
            _id: recipesArray[1]._id,
          }).exec();
          expect(recipe).toBeTruthy();
          expect(recipe.name).toEqual(recipesArray[1].name);
          expect(recipe.summary).toEqual(recipesArray[1].summary);
          done();
        });
    });

    test('should not edit a valid id recipe that does not exist', async done => {
      const id = mongoose.Types.ObjectId();
      const update = {
        name: 'new name',
        summary: 'new summary',
      };
      request(app)
        .patch(`/api/recipes/${id}`)
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(update)
        .expect(404)
        .expect(res => {
          expect(res.body).toEqual({ error: 'Recipe not found' });
        })
        .end(done);
    });

    test('should not edit a recipe that belongs to another user', async done => {
      const id = recipesArray[1]._id;
      const update = {
        name: 'new name',
        summary: 'new summary',
      };
      request(app)
        .patch(`/api/recipes/${id}`)
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .send(update)
        .expect(404)
        .expect(res => {
          expect(res.body).toEqual({ error: 'Recipe not found' });
        })
        .end(async err => {
          if (err) done(err);
          const recipe = await Recipe.findOne({
            _id: recipesArray[1]._id,
          }).exec();
          expect(recipe).toBeTruthy();
          expect(recipe.name).toEqual(recipesArray[1].name);
          expect(recipe.summary).toEqual(recipesArray[1].summary);
          done();
        });
    });

    test('After changing session cookie to owner of recipe (not session sig) returns a 401', async done => {
      const id = recipesArray[1]._id;
      const update = {
        name: 'new name',
        summary: 'new summary',
      };
      const newUser = await userFactory.createUserWithId(usersArray[1]);
      // Copying user session cookie, but user sig stays the same
      const { session: newSession } = sessionFactory(newUser);

      request(app)
        .patch(`/api/recipes/${id}`)
        .set('Cookie', `session=${newSession}; session.sig=${sig}`)
        .send(update)
        .expect(401)
        .expect(res => {
          expect(res.body).toEqual({ error: 'You must log in' });
        })
        .end(async err => {
          if (err) done(err);
          const recipe = await Recipe.findOne({
            _id: recipesArray[1]._id,
          }).exec();
          expect(recipe).toBeTruthy();
          expect(recipe.name).toEqual(recipesArray[1].name);
          expect(recipe.summary).toEqual(recipesArray[1].summary);

          await userFactory.deleteUserOnly(newUser._id);
          done();
        });
    });

    test('With valid user and valid recipe id edits and returns recipe', async done => {
      const id = recipesArray[3]._id;
      const update = {
        name: 'new name',
        summary: 'new summary',
      };
      const newUser = await userFactory.createUserWithId(usersArray[3]);
      const { sig: newSig, session: newSession } = sessionFactory(newUser);

      request(app)
        .patch(`/api/recipes/${id}`)
        .set('Cookie', `session=${newSession}; session.sig=${newSig}`)
        .send(update)
        .expect(200)
        .expect(res => {
          const { name, summary, _id, _user, dateModified } = res.body;
          expect(name).toEqual(update.name);
          expect(summary).toEqual(update.summary);
          expect(_id).toEqual(recipesArray[3]._id.toString());
          expect(_user).toEqual(recipesArray[3]._user.toString());
          expect(dateModified).not.toEqual(recipesArray[3].dateModified);
        })
        .end(async err => {
          if (err) done(err);
          const recipe = await Recipe.findOne({
            _id: recipesArray[3]._id,
          }).exec();
          expect(recipe).toBeTruthy();
          expect(recipe.name).toEqual(update.name);
          expect(recipe.summary).toEqual(update.summary);

          await userFactory.deleteUserOnly(newUser._id);
          done();
        });
    });
  });

  describe('DELETE /api/recipes/:id', () => {
    test('With invalid recipe id returns a 404', async done => {
      request(app)
        .delete('/api/recipes/123')
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .expect(404)
        .expect(res => {
          expect(res.body).toEqual({ error: 'Invalid recipe id' });
        })
        .end(async err => {
          if (err) return done(err);

          const allRecipes = await Recipe.find({}).exec();
          expect(allRecipes.length).toBe(recipesArray.length);
          return done();
        });
    });
    test('With a valid recipe id that does not exist returns a 404', async done => {
      const recipeId = mongoose.Types.ObjectId();
      request(app)
        .delete(`/api/recipes/${recipeId}`)
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .expect(404)
        .expect(res => {
          expect(res.body).toEqual({ error: 'Recipe not found' });
        })
        .end(async err => {
          if (err) return done(err);

          const allRecipes = await Recipe.find({}).exec();
          expect(allRecipes.length).toBe(recipesArray.length);
          return done();
        });
    });
    test('With a recipe id not belonging to user returns a 404', async done => {
      const { _id } = recipesArray[0];
      request(app)
        .delete(`/api/recipes/${_id}`)
        .set('Cookie', `session=${session}; session.sig=${sig}`)
        .expect(404)
        .expect(res => {
          expect(res.body).toEqual({ error: 'Recipe not found' });
        })
        .end(async err => {
          if (err) return done(err);

          const allRecipes = await Recipe.find({}).exec();
          expect(allRecipes.length).toBe(recipesArray.length);
          return done();
        });
    });

    test('After changing session cookie to owner of recipe (not session sig) returns a 401', async done => {
      const newUser = await userFactory.createUserWithId(usersArray[2]);
      // Copying user session cookie, but user sig stays the same
      const { session: newSession } = sessionFactory(newUser);

      request(app)
        .delete(`/api/recipes/${recipesArray[2].id}`)
        .set('Cookie', `session=${newSession}; session.sig=${sig}`)
        .expect(401)
        .expect(res => {
          expect(res.body).toEqual({ error: 'You must log in' });
        })
        .end(async err => {
          if (err) return done(err);

          const allRecipes = await Recipe.find({}).exec();
          expect(allRecipes.length).toBe(recipesArray.length);

          await userFactory.deleteUserOnly(newUser._id);
          return done();
        });
    });
    test('With valid user and valid recipe id deletes and returns recipe', async done => {
      const newUser = await userFactory.createUserWithId(usersArray[0]);
      const { sig: newSig, session: newSession } = sessionFactory(newUser);

      request(app)
        .delete(`/api/recipes/${recipesArray[0].id}`)
        .set('Cookie', `session=${newSession}; session.sig=${newSig}`)
        .expect(200)
        .expect(res => {
          const { name, _id, _user } = res.body;
          expect(name).toEqual(recipesArray[0].name);
          expect(_id).toEqual(recipesArray[0]._id.toString());
          expect(_user).toEqual(recipesArray[0]._user.toString());
        })
        .end(async err => {
          if (err) {
            return done(err);
          }
          const allRecipes = await Recipe.find({}).exec();
          expect(allRecipes.length).toBe(recipesArray.length - 1);

          const recipe = await Recipe.find({ _id: recipesArray[0].id }).exec();
          expect(recipe).toEqual([]);

          await userFactory.deleteUserOnly(newUser._id);
          return done();
        });
    });
  });
});
