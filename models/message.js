//schema
const dynamoose = require('../db/config');

const messageSchema = new dynamoose.Schema({
    "messageId": {
        "type" : String,
        "hashKey": true
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