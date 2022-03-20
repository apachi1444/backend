module.exports=function notifications(io, socket) {
    socket.on('send-notification', ({notification, from, to})=>{
        console.log('notifications comming');
    });
    
}