'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: String,
	active: Boolean,
	users: Array
});

module.exports = mongoose.model('Groups', GroupSchema);