'use strict';

const bodyparser = require('body-parser');
const controller = require('../controllers/userController');

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/users', controller.getAllUsers);

	router.get('/users/:userId', controller.getUserById);

	router.post('/users', controller.createUser);

	// router.put('/users/:userId', controller.modifyUser)
}
