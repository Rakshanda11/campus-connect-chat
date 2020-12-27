const { v4: uuidv4 } = require('uuid');
const dynamoose = require('../db/config');


const messageSchema = new dynamoose.Schema({
    messageId: {
        type: String,
        hashKey: true,
        default: () => uuidv4()
    },
    to: String,
    from: String,
    message: String,
    type: String,
    conversationId: {
        type: String,
        index: {
            name: "Conversation-Index",
            global: true,
            rangeKey: "createdAt"
        }
    }
}, {
    saveUnknown: true,
    timestamps: true
})

const Message = dynamoose.model('Messages', messageSchema);
module.exports = Message;