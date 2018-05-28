const mongoose = require('mongoose');
const Section = require('./Section');
const Rating = require('./Rating');

const { Schema } = mongoose;

const recipeSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    required() {
      return this.isFinal;
    },
  },
  summary: String,
  notes: [String],
  rating: [Rating],
  totalRating: { type: Number, default: 0 },
  cookingTime: Number,
  preparationTime: Number,
  ingredients: {
    type: [Section],
    validate(array) {
      if (this.isFinal) {
        return array.length > 0;
      }
      return true;
    },
  },
  preparation: [Section],
  cooking: {
    type: [Section],
    validate(array) {
      if (this.isFinal) {
        return array.length > 0;
      }
      return true;
    },
  },
  category: [String],
  imageUrl: [String],
  dateCreated: { type: Date, required: true },
  dateModified: { type: Date, required: true },
  isFinal: { type: Boolean, required: true },
});

mongoose.model('Recipe', recipeSchema);
