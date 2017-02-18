'use strict';

const User = require('../models/UserModel');
const { logError } = require('../utils/utilities');

module.exports = {
	createUser: function(req, res) {
		const newUser = new User(req.body);
		newUser.save(function(err, data) {
			if (err) {
				return logError('Error creating a user: ', err, res);
			}
			res.json({
				'msg': 'Successfully created user'
			});
		});
	},
	getUserById: function(req, res) {
		User.find({_id: req.params.userId}, function(err, user) {
			if (err) {
				return logError('Error retrieving users: ', err, res);
			}
			res.json({
				'users': user
			});
		});
	},
	getAllUsers: function(req, res) {
		User.find({}, function(err, data) {
			if (err) {
				return logError('Error retrieving users: ', err, res)
			}
			res.json({
				'users': data
			});
		});
	},
	modifyUser: function(req, res) {
		const updatedUser = req.body;
		const userId = req.params.userId;
		User.findOneAndUpdate({_id: userId}, updatedUser, function(err, doc) {
			if (err) {
				return logError('Error updating user with _id ' + userId, err, res);
			}
			res.json({
				'msg': 'Successfully updated user'
			});
		});
	}
}


