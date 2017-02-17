'use strict';

const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://localhost:27017/small_group_dev';
let _db;


module.exports = {
	connectToServer: (callback) => {
		MongoClient.connect(MONGO_URL, function(err, db) {
			_db = db;
			return callback(err);
		});
	},
	getDb: () => {
		return _db;
	}
}