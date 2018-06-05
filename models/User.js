const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  givenName: String,
  familyName: String,
  email: String,
});

mongoose.model('User', userSchema);
