const mongoose = require('mongoose');

const User = mongoose.model('users');

// Make a new user_id in mongodb and return it
const createUser = () => new User({}).save();

const deleteUser = id => {
  User.findByIdAndRemove(id, () => {});
};

module.exports = {
  createUser,
  deleteUser,
};
