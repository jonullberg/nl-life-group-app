'use strict';

const bodyparser = require('body-parser');
const groupController = require('../controllers/groupController');

module.exports = function(router) {
	const RESOURCE_NAME = '/groups';
	router.use(bodyparser.json());

	router.get(RESOURCE_NAME, groupController.getGroups);
	router.post(RESOURCE_NAME, groupController.createGroup);
	router.get(RESOURCE_NAME + '/:groupId', groupController.getGroupById);
	router.post(RESOURCE_NAME + '/:groupId/tag', groupController.addTagToGroup);
	router.post(RESOURCE_NAME + '/:groupId/user/:userId', groupController.addUserToGroup);
	router.delete(RESOURCE_NAME + '/:groupId/user/:userId', groupController.removeUserFromGroup);
}