jest.setTimeout(10000);

require('../models/User');

const mongoose = require('mongoose');
require('dotenv').config();
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
