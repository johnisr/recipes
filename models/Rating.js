const mongoose = require('mongoose');

const { Schema } = mongoose;

const ratingSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
});

module.exports = ratingSchema;
