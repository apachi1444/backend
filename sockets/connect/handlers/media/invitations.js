const warning=require("../dispatches/warning");
const { Invitation } = require("../../../../Models/media/Invitation");
const User = require("../../../../Models/User");

module.exports=function invitations(io, socket) {
    if(!socket.handshake.session.payload.authentified) 
        return warning(socket, {error: 'You must be authentified to invite someone'});
    socket.on('send-invitation', async({ notification, from, to })=>{
        try {
            const inv=new Invitation({ invitter: from, invitted: to });
            const savedInv=await inv.save();
            const user=await User.findOneAndUpdate({_id: to}, {
                $push:{
                    invitations: savedInv._id
                }
            });
            if(user) return warning(socket, { message: 'Your invitation was sent successfully!'});
            return warning(socket, { error: 'Your invitation could not be sent successfully!'});
        } catch (error) {
            console.log(error);
            return warning(socket, { message: 'Your invitation could not be sent successfully!'});
        }
    }); 
    
}