var sockets = {};

var addUser = (userName, socket) => {
    sockets[socket.id] = {
        userName,
        socket
    }
}
var deleteUser = (socket) => {
    delete sockets[socket.id];
}
var getUser = (userName) => {
    console.log(userName)
    var keys = Object.keys(sockets);
    var obj = keys.filter(key => {
        return sockets[key].userName === userName;
    })
    obj = obj.map(key => {
        return sockets[key].socket;
    })
    return obj;
}

module.exports = { deleteUser, getUser, addUser };