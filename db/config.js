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
  dynamodb = new AWS.DynamoDB({
    sessionToken: "FwoGZXIvYXdzELT//////////wEaDINAiVq/FWf1TUJ6rSLIAU4v76bWr7zfQyfA47CG8mUWDsfW51McUq9GlLYXLVUP6obyB0VTOZXwy2vOrn8wKBXZ+D628mVuyuJBSuactS28Y4uCXBkkjEi9xxZio8tKmAbKgAFiSs+CZhWwrrCQOJ2rufdRDPCE/mMbSsltPHQsx5Xa9JGZVaY850sUY7MAR76/2SiWLLDIn2rSUlQARrAYYPEH8pFKdDSASUIhLdeyjfUYVdXnNYqYcf+cFBW8iEKo7g4dEGKstlpN6csiE51W6urVtqkkKIa05P8FMi1K0ymaLf884pYwRU6B2LnoYYvZNBFFXQqgtTPAEVFJGt8GIwFvfz2cnsJk2wg=",
    accessKeyId: "ASIAZUCJUVXAVG5SYKP7",
    secretAccessKey: "FQplKgCO4EYIoHOC3TVBms0/OUAj5DkB84cNxE2/",
    region: "us-east-1",
  });
  dynamoose.aws.ddb.set(dynamodb);


  // dynamoose.aws.sdk.config.update({
  //   accessKeyId: "abc",
  //   secretAccessKey: "abc",
  //   region: "ap-south-1",
  // });
  // dynamoose.aws.ddb.local("http://localhost:8000");
}
module.exports = dynamoose;
