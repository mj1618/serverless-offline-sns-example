var AWS = require("aws-sdk");
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
    }),
  };
});
