const mongoose = require('mongoose');

const { Schema } = mongoose;

const sectionSchema = new Schema({
  title: String,
  body: [String],
});

module.exports = sectionSchema;
