module.exports.pong = (event, context, callback) => {
  console.log("pong");
  console.log("env: "+process.env.MY_VAR);
  console.log(event.Records[0].Sns.Message);
  callback(null, {});
};

