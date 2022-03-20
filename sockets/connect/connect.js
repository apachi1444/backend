const messanger=require('./handlers/media/messanger.js');
const invitations=require('./handlers/media/invitations.js');
const notifications=require('./handlers/media/notifications.js');
const audioCall=require('./handlers/media/audioCall.js');
const videoCall=require('./handlers/media/videoCall.js');

module.exports=function(io, socket){
    socket.handshake.session.authentified=true //just for testing
    console.log(socket.handshake.session)
    //Soc media events
    messanger(io, socket);
    
    audioCall(io, socket);
    videoCall(io, socket);
    invitations(io, socket);
    notifications(io, socket);

    return;
}

