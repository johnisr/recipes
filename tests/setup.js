// Depends on chromium performance
jest.setTimeout(20000);

require('../models/User');
require('../models/Recipe');

const mongoose = require('mongoose');
require('dotenv').config();
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
