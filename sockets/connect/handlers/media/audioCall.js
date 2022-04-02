
module.exports=function audioCall(io, socket) {
    socket.on('audio-call-start', ({audioCall, from, to})=>{
        console.log('audio call comming');
    });
    
    socket.on('audio-call-end', ({audioCall, from, to})=>{
        console.log('audio call comming');
    });
}