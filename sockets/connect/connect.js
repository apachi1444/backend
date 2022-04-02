const messanger=require('./handlers/media/messanger.js');
const invitations=require('./handlers/media/invitations.js');
const notifications=require('./handlers/media/notifications.js');
const audioCall=require('./handlers/media/audioCall.js');
const videoCall=require('./handlers/media/videoCall.js');

module.exports=function(io, socket){
    socket.handshake.session.payload={
        authentified: true,
        token: "oxjdkskksskjdkks23##$jfkdk" 
    }; //just for testing
    console.log(socket.handshake.session);
    //these are built
    messanger(io, socket);
    invitations(io, socket);
    notifications(io, socket);
    //these are not built yet
    audioCall(io, socket);
    videoCall(io, socket);
    return;
}

