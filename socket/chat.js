const { addUser, deleteUser, getUser } = require('./socketManager');
const Message = require('../models/message');

module.exports = function (io) {
    io.on("connection", socket => {
        console.log("new socket connection");
        socket.on("join", (payload, err) => {
            console.log(payload.userName)
            addUser(payload.userName, socket);
        })

        socket.on("send", async (payload, err) => {

            if (payload.to) {
                // This is a personal message
                const msgObj = new Message(payload);
                await msgObj.save(err => {
                    if (err)
                        console.log("Error", err);
                });
                const sockets = getUser(payload.to);
                sockets.forEach(userSocket => {
                    userSocket.emit("recieve", payload);
                })
            }
        })

        socket.on("disconnect", () => {
            deleteUser(socket);
        })
    })
}