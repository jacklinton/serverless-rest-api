'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
}); // remove before deploy

module.exports.create = (event, context, callback) => {
  // create a note and put it in the database
    const data = JSON.parse(event.body);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        content: data.content
      }
    };

    dynamoDb.put(params, (error) => {

      if (error) {
        console.error(error);
        return callback(null, {
          statusCode: error.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        });
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      };
      callback(null, response);
    });
};

module.exports.getOne = (event, context, callback) => {
    // get one note from the database
    const response = {
        statusCode: 200,
        body: JSON.stringify('Fetch one note.')
    };
    callback(null, response);
};

module.exports.getAll = (event, context, callback) => {
    // get all notes from the database
    const response = {
        statusCode: 200,
        body: JSON.stringify('Fetch all notes.')
    };
    callback(null, response);
};

module.exports.update = (event, context, callback) => {
    // update a note in the database
    const response = {
        statusCode: 200,
        body: JSON.stringify('Update a note.')
    };
    callback(null, response);
};

module.exports.delete = (event, context, callback) => {
    // delete a note from the database
    const response = {
        statusCode: 200,
        body: JSON.stringify('Delete a note.')
    };
    callback(null, response);
};
