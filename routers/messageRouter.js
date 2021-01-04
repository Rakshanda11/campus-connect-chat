const express = require('express');
const Message = require('../models/message');

const app = express.Router({
    mergeParams: true
})


app.get('/hello', (req, res, next) => {
    res.send("Hello");
})

const msg = {
    messageId: "2",
    to: "Ava",
    from: "Dragon",
    message: "Hello",
    type: "Video",
    conversationId: "hjhjhj"
}

app.get('/write', async (req, res, next) => {
    const msgObj = new Message(msg);
    await msgObj.save(err => {
        if (err) {
            console.log('Error Occured', err);
            res.status(404).send(err);
        }
        else
            res.send("Done")
    });
})

app.get('/messages', async (req, res) => {
    let from = req.query.from;
    let to = req.query.to;
    let conversationId = from.localeCompare(to) === 1 ? `${to}$${from}` :
        `${from}$${to}`;
    Message.query("conversationId").eq(conversationId).using("Conversation-Index").exec((err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/convoList', async(req, res) => {
    // Gets all conversations names
    let userName = req.query.userName;
    try {
        let results = await Message.scan('conversationId').attributes(['from', 'to']).using('Conversation-Index').contains(userName).exec();
        let convoList = new Set();
        results.forEach(result => convoList.add(result.to));
        console.log(convoList);
        res.send(Array.from(convoList));
    }
    catch(error) {
        console.log(error);
        res.status(404).send();
    }
})

app.get('/read', async (req, res, next) => {
    Message.query("messageId").eq("1").exec((err, result) => {
        if (err)
            console.log("ERROR", err);
        else
            res.send(result);
    });
})

module.exports = app;