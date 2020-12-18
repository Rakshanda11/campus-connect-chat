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
    type: "Video"
}

app.get('/write', async (req, res, next) => {
    const msgObj = new Message(msg);
    await msgObj.save(err => {
        if (err)
            console.log('Error Occured', err);
        else
            res.send("Done")
    });
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