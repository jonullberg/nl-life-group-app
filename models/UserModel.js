'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  'name': {
    'first': String,
    'last': String
  },
  'age': Number,
  'groups': [Number],
});

module.exports = mongoose.model('Users', UserSchema);