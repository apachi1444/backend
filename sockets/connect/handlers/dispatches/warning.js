

module.exports=function warning(socket, warningObject) {
    return socket.emit('warning', warningObject);
}