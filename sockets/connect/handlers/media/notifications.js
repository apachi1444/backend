const warning=require("../dispatches/warning");
const { Notification } = require("../../../../Models/media/Notification");
const User = require("../../../../Models/User");

module.exports=function notifications(io, socket) {
    if(!socket.handshake.session.payload.authentified) 
        return warning(socket, {error: 'You must be authentified to send notifications'});
    socket.on('send-notification', async({ notification, from, to })=>{
        try {
            const not=new Notification({ reacterId: from, reactedId: to, reactionType: notification });
            const savedNot=await not.save();
            const user=await User.findOneAndUpdate({_id: to}, {
                $push:{
                    notifications: savedNot._id
                }
            });
            if(user) return warning(socket, { message: 'Your notification was sent successfully!'});
            return warning(socket, { error: 'Your notification could not be sent successfully!'});
        } catch (error) {
            console.log(error);
            return warning(socket, { message: 'Your notification could not be sent successfully!'});
        }
    }); 
}