
module.exports=function videoCall(io, socket) {
    socket.on('video-call-start', ({videoCall, from, to})=>{
        console.log('video call comming');
    });
    
    socket.on('video-call-end', ({call, from, to})=>{
        console.log('video call ended');
    });

    
}