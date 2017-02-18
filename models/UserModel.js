'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  'name': {
    'first': {
    	type: String,
    	required: true
    },
    'last': String
  },
  'groups': [mongoose.Schema.Types.ObjectId],
  'dateAdded': {
  	type: Date,
  	default: Date.now
  },
  'lastUpdated': {
  	type: Date,
  	required: true
  }
});

module.exports = mongoose.model('Users', UserSchema);