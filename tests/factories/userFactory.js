const mongoose = require('mongoose');

const User = mongoose.model('User');
const Recipe = mongoose.model('Recipe');

// Make a new user_id in mongodb and return it
const createUser = () => new User({}).save();

const deleteUser = async id => {
  await Promise.all([
    User.findByIdAndRemove(id).exec(),
    Recipe.deleteMany({ _user: { _id: id } }).exec(),
  ]);
};

module.exports = {
  createUser,
  deleteUser,
};
