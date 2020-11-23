var sockets = {}

var addUser = function(userName, socket){
    sockets[socket.id] = {
        userName,
        socket
    }

    // console.log(sockets);
}

var removeUser = function(socket){
    delete sockets[socket.id]
}

var getUser = function(userName){
    console.log(userName);
    var keys = Object.keys(sockets);
    console.log(sockets);
    console.log(keys);
    var obj = keys.filter((key)=>{
        return sockets[key].userName === userName
    })
    console.log(obj)
    obj = obj.map((key)=> {
        return sockets[key].socket
    })

    return obj;
}

module.exports = {
    addUser,
    removeUser,
    getUser
}