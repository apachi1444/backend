module.exports=function invitations(io, socket) {
    socket.on('send-invitation', ({invitation, from, to})=>{
        console.log('invitations comming');
    });
    
}