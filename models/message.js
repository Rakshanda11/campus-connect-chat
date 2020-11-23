//schema
const dynamoose = require('../db/config');
var shortId = require('shortid');

const messageSchema = new dynamoose.Schema({
    "messageId": {
        "type" : String,
        "hashKey": true,
        "default": shortId.generate
    },
    "to": String,
    "from": String,
    "message": String,
    "type": String
}, {
    "saveUnknown": true,
    "timestamps": true
});

const message = dynamoose.model('Messages',messageSchema);

module.exports = message;