'use strict';

const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const { 
	graphql,
	buildSchema
} = require('graphql');
const Schema = require('./schema');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const db = require('./mongoUtil').getDb();

const PORT = 3050;
const COLLECTION = 'groups';

const GROUP = mongoose.model('Group', {
	id: mongoose.Schema.Types.ObjectId,
	name: String,
	active: Boolean,
	users: Array
})

app.use(bodyParser.json());

const schema = buildSchema(`
	type Query {
		group(groupId: String!): String
	}
`);

const getDocumentByID = function(db, collection, id, callback) {
	var id = ObjectId(id);
	db.collection(collection.toString())
		.findOne({'_id': id})
		.then(function(document) {
			callback(document);
		});
}

const root = {
	group: ({ groupId }) => {
		getGroup(groupId, function(testName) {
			return JSON.stringify(testName);
		});
	},
	groups: () => {

	}
};

function getGroup(groupId, callback) {
	MongoClient.connect(URL, function(err, db) {
		if (err) {
			console.log('Unable to connect to Mongo DB', err);
			return 'Internal Server Error';
		}
		return getDocumentByID(db, COLLECTION, groupId, function (document) {
			db.close();
			callback(document['Test']);
		});
	})
}

app.use('/graphql', graphqlHTTP({
	schema: schema,
	pretty: true,
	rootValue: root,
	graphiql: true
}));

app.listen(PORT, function() {
	console.log('Your app is listening on port: ', PORT);
});