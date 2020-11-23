const message = require('../models/message');
const {addUser, removeUser, getUser} = require('./socketManager');

module.exports = function(io){
    io.on('connection', socket => {
        console.log('New Socket Connection');

        socket.on('join', async (payload, callback)=> {
            console.log(payload.userName + ' joined');
            addUser(payload.userName,socket);
        })
        
        socket.on('send', async (payload, callback)=> {
            console.log(payload);

            if(payload.to){
                //this is a personal message
                const messageObj = new message(payload);
                await messageObj.save(error => {
                    if (error) {
                        console.log("error", error)
                    }
                });

                const sockets = getUser(payload.to)
                console.log(sockets);
                sockets.forEach((userSocket)=>{
                    userSocket.emit('recieveMessage', payload);
                })
                
            }
            else{
                //group message
            }
        })

        socket.on('disconnect', async() => {
            removeUser(socket);
        })
    })
}