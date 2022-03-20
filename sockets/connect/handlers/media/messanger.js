const warning=require("../dispatches/warning.js");
const {Conversation, MessageSchema}=require('../../../../Models/media/Conversation');

module.exports=function messanger(io, socket) {
    if(!socket.handshake.session.authentified) 
        return warning(socket, {error: 'You must be authentified to send msgs'});
    socket.on('send-message', async({message, from, to})=>{
        try {
            // adding msg to db, continue here!
        } catch (error) {
            console.log(error);
            return warning(socket, {error: 'Message could not be sent, try again later!'});   
        
        }
    });

}