const { addUser, deleteUser, getUser } = require('./socketManager');
const Message = require('../models/message');

module.exports = function (io) {
    io.on("connection", socket => {
        socket.on("join", (payload, err) => {
            console.log("new socket connection joined");
            console.log(payload.userName)
            addUser(payload.userName, socket);
            socket.emit("joined");
        })

        socket.on("send", async (payload, err) => {

            if (payload.to) {
                // This is a personal message
                console.log(payload.from.localeCompare(payload.to))
                let conversationId = payload.from.localeCompare(payload.to) === 1 ? `${payload.to}$${payload.from}` :
                    `${payload.from}$${payload.to}`;
                const msgObj = new Message({ ...payload, conversationId });
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