const dynamoose = require('dynamoose');

dynamoose.aws.sdk.config.update({
    accessKeyId: "abc",
    secretAccessKey: "abc",
    region: "ap-south-1"
})

dynamoose.aws.ddb.local("http://localhost:8000")
module.exports = dynamoose;