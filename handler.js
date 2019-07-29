'use strict';
var AWS = require("aws-sdk");

module.exports.ping = (event, context, callback) => {
  var sns = new AWS.SNS({
    endpoint: "http://127.0.0.1:4002",
    region: "us-east-1",
  });
  sns.publish({
    Message: '{"default": "hello!"}',
    MessageStructure: "json",
    TopicArn: "arn:aws:sns:us-east-1:123456789012:test-topic",
  }, () => {
    console.log("ping");
    callback(null, {response: "return from lambda ping"});
  });
};

module.exports.pong = (event, context, callback) => {
  console.log("pong");
  console.log(JSON.stringify(event));
  // console.log(event.Records[0].Sns.Message);
  callback(null, {response: "return from lambda pong"});
};
