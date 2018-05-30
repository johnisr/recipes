const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipe = mongoose.model('Recipe');

module.exports = app => {
  app.post('/api/recipes', requireLogin, async (req, res) => {
    const {
      name,
      summary,
      notes,
      cookingTime,
      preparationTime,
      category,
      ingredients,
      preparation,
      cooking,
    } = req.body;
    const recipe = new Recipe({
      _user: req.user.id,
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

    try {
      const body = await recipe.save();
      res.status(200).send(body.toObject());
    } catch (err) {
      res.status(422).send({ error: 'Improper recipe format' });
    }
  });

  app.get('/api/recipes', async (req, res) => {
    try {
      const recipes = await Recipe.find({ isFinal: true });

      res.send(recipes);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
};
