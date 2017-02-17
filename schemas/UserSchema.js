'use strict';

const { 
	GraphQLObjectType, 
	GraphQLID,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema
} = require('graphql');



const UserType = new GraphQLObjectType({
	name: 'todo',
	fields: function () {
	    return {
	      	id: {
	        	type: GraphQLID
	      	},
	      	title: {
	        	type: GraphQLString
	      	},
	      	completed: {
	        	type: GraphQLBoolean
	      	}
	    }
  	}
});

const queryType = new GraphQLObjectType({  
  	name: 'Query',
  	fields: function () {
    	return {
      		todos: {
        		type: new GraphQLList(TodoType),
        		resolve: function () {
          			return new Promise(function (resolve, reject) {
          				setTimeout(function() {
          					resolve(TODOs)
          				}, 8000);
          			});
        		}
      		}
    	}
  	}
});

module.exports = UserType;