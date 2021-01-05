const AWS = require('aws-sdk')
const dynamoose = require('dynamoose');


var dynamodb = new AWS.DynamoDB({
    sessionToken: process.env.sessionToken,
    accessKeyId: process.env.accessKey,
    secretAccessKey: process.env.secretKey,
    region: process.env.region
});


// dynamoose.aws.sdk.config.update({
//     accessKeyId: process.env.accessKey,
//     secretAccessKey: process.env.secretKey,
//     region: process.env.region
// })

// dynamoose.aws.ddb.local("http://localhost:8000")

dynamoose.aws.ddb.set(dynamodb);
module.exports = dynamoose;