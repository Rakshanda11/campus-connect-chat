const express = require('express');
const message = require('../models/message');

const app = express.Router({
    mergeParams: true
})

app.get("/test", async(req,res,next) => {
    //console.log(req);
    res.send("Hello");
})

app.get("/getMessage", async(req,res,next) => {
    message.query("messageId").eq("1234").exec((err,result)=> {
        if(err){
            console.log("error",err);
        }
        else{
            res.send(result);
        }
    });
})

const msg = {
    "to": "apurv",
    "from": "xyz",
    "message": "Hello",
    "type": "text"
}

app.get("/writeMessage", async(req,res,next)=>{
    const messageObj = new message(msg);
    await messageObj.save(error => {
        if(error){
            console.log("error", error)
        }
        else{
            res.send("successful");
        }
    });
})

module.exports = app;