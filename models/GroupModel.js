'use strict';

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	leaderId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	dateCreated: {
		type: Date,
		default: Date.now,
		required:true
	},
	lastUpdated: {
		type: Date,
		default: Date.now
	},
	groupName: {
		type: String,
		required: true
	},
	groupDescription: {
		type: String
	},
	active: {
		type: Boolean,
		default:false
	},
	users: [mongoose.Schema.Types.ObjectId],
	tags: [{type: String, lowercase: true}],
	participants: {
		type:Number,
		required: true,
		default: 1
	}
});

module.exports = mongoose.model('Groups', GroupSchema);