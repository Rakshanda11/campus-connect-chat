const AWS = require("aws-sdk");
const dynamoose = require("dynamoose");

var dynamodb = new AWS.DynamoDB({
  sessionToken: process.env.sessionToken,
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretKey,
  region: process.env.region,
});

// dynamoose.aws.sdk.config.update({
//     accessKeyId: process.env.accessKey,
//     secretAccessKey: process.env.secretKey,
//     region: process.env.region
// })

if (process.env.sessionToken) {
  dynamoose.aws.ddb.set(dynamodb);
} else {
  dynamoose.aws.sdk.config.update({
    accessKeyId: "abc",
    secretAccessKey: "abc",
    region: "ap-south-1",
  });
  dynamoose.aws.ddb.local("http://localhost:8000");
}
module.exports = dynamoose;
