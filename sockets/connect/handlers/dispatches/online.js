
module.exports=function onlinePeople(io, socket) {
    socket.on('online', ({online, from, to})=>{
        console.log('online comming');
    });
    
    socket.on('video-call-end', ({call, from, to})=>{
        console.log('online comming');
    });    
}