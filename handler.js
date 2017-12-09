'use strict';
var AWS = require("aws-sdk");

module.exports.ping = (event, context, callback) => {
  var sns = new AWS.SNS({
    endpoint: "http://127.0.0.1:4002",
    region: "us-east-1",
  });
  sns.publish({
    Message: "hello!",
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
};

module.exports.pong = (event, context, callback) => {
  console.log("pong");
  console.log(event.Records[0].Sns.Message);
  callback(null, {});
};
