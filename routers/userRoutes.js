'use strict';

const bodyparser = require('body-parser');
const controller = require('../controllers/userController');

module.exports = function(router) {
	const RESOURCE_NAME = '/users';
	router.use(bodyparser.json());

	router.get(RESOURCE_NAME, controller.getAllUsers);
	router.get(RESOURCE_NAME + '/:userId', controller.getUserById);
	router.post(RESOURCE_NAME, controller.createUser);
}
