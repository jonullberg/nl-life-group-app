'use strict';

const { waterfall } = require('async');
const { logError } = require('../utils/utilities');
const validator = require('../utils/validator');

const Group = require('../models/GroupModel');
const User = require('../models/UserModel');

module.exports = {
	getGroups: function(req, res) {
		waterfall([
			function(callback) {
				Group.find({}, function(err, data) {
					if (err) {
						logError('Error attempting to get all groups', err, res)
						return;
					}
					callback(null, data);
				});
			}, function(groups, callback) {
				callback(null, groups);
			}], function(err, groups) {
				res.json({
					'groups': groups
				});
			});
	},
	getGroupById: function(req, res) {
		const groupId = req.params.groupId;
		waterfall([
			function(callback) {
				Group.find({_id: groupId}, function(err, group) {
					if (err) {
						logError('Error attempting to get group', err, res);
						return;
					}
					callback(null, group)
				});
			}, function(group, callback) {
				callback(null, group);
			}
			], function(err, group) {
				res.json({
					'groups': group
				})
			});
	},
	createGroup: function(req, res) {
		const group = Object.assign({}, req.body, {
			leaderId: req.headers.userid,
			active: false,
			users: [req.headers.userid]
		});
		const newGroup = new Group(group);
		newGroup.save(function(err, data) {
			if (err) {
				logError('Error attempting to create group', err, res);
				return;
			}
			res.json({
				'msg': 'Successfully created group'
			});
		});
	},
	addTagToGroup: function(req, res) {
		const tag = req.body.tag;
		const groupId = req.params.groupId;
		Group.findOneAndUpdate({_id: groupId}, {$push: {tags: tag}}, function(err, data) {
			if (err) {
				logError('Error attempt to add tag to group', err, res);
				return;
			}
			res.json({
				'msg': 'Successfully added tag to group'
			});
		});
	},
	addUserToGroup: function(req, res) {
		const userId = req.params.userId;
		const groupId = req.params.groupId;
		waterfall([
			function(callback) {
				Group.findById(groupId, function(err, group) {
					err ?
						callback(err) :
						callback(null, group);
				});
			}, function(group, callback) {
				validator.validateNoDuplicateIds(group.users, userId) ? 
					callback(null) : 
					callback('This group already has this user');
			},function(callback) {
				Group.findOneAndUpdate({_id: groupId}, {$push: {users: userId}, $inc: {participants:1}}, function(err, data) {
					err ?
						callback(err) :
						callback(null);
				});
			}, function(callback) {
				User.findById(userId, function(err, data) {
					err ?
						callback(err) :
						callback(null, data);
				});
			}, function(user, callback) {
				validator.validateNoDuplicateIds(user.groups, groupId) ?
					callback(null) :
					callback('This user already has this group ID attached');
			}, function(callback) {
				User.findOneAndUpdate({_id: userId}, {$push: {groups: groupId}}, function(err, data) {
					err ?
						callback(err) :
						callback(null, data);
				});

			}
			], function(err) {
				if (err) {
					return logError('ERROR', err, res);
				}
				res.json({
					'msg': 'Successfully added user to group'
				});
		});
		
	},
	removeUserFromGroup: function(req, res) {
		const userId = req.params.userId;
		const groupId = req.params.groupId;

		waterfall([
			function(callback) {
			Group.findById(groupId, function(err, group) {
				if (err) {
					logError('Error removing user from group', err, res);
					return;
				}
				callback(null, group);
			});
		}, function(group, callback) {
			callback(null, group);
		}, function(group, callback) {
			User.findOneAndUpdate({_id: userId}, {}, function(err, data) {
				if (err) {
					logError('Error removing group ID from user', err, res);
					return;
				}
				callback(null);
			});
		}], function(err) {
			res.json({
				'msg': 'Successfully removed user from group'
			});
		});
	}
}