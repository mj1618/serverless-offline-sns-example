'use strict';
var AWS = require("aws-sdk");
const dd = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
})

module.exports.ping = (event, context, callback) => {
  console.log("context");
  console.log(context);
  var sns = new AWS.SNS({
    endpoint: "http://127.0.0.1:4002",
    region: "us-east-1",
  });
  dd.put({
    'TableName': 'usersTable',
    'Item': {email: 'adam@west.com'}
 }, function(err, data) {
  sns.publish({
    Message: JSON.stringify({foo: "bar"}),
    MessageStructure: "json",
    TopicArn: "arn:aws:sns:us-east-1:123456789012:test-topic",
  }, () => {
    console.log("ping");
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Ping sent!',
        input: event,
      }),
    };

    callback(null, response);
  });
 });
};

module.exports.pong = (event, context, callback) => {
  console.log(context);
  console.log("pong");
  console.log(event.Records[0].Sns.Message);
  var params = {
    TableName: "usersTable",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames:{
        "#email": "email"
        },
    ExpressionAttributeValues: {
        ":email":"adam@west.com"
        }
    };
    dd.query(params,function(err, data){
      console.log('dynamo result: ');
      console.log(data);
      callback(null, {});
    });
};
