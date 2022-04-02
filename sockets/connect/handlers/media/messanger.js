const warning=require("../dispatches/warning.js");
const { Conversation, MessageSchema }=require('../../../../Models/media/Conversation');
const User =require('../../../../Models/User');

module.exports=function messanger(io, socket) {
    if(!socket.handshake.session.payload.authentified) 
        return warning(socket, {error: 'You must be authentified to send msgs'});
    socket.on('send-message', async({message, from, to})=>{
        try {
            const receiver=await User.findOne({ _id: to }, { friends: 1, _id: 1 });
            const sender=await User.findOne({ _id: from }, { friends: 1, _id: 1 });
            if(sender && receiver && receiver.friends.includes(from)){
                const msg=new MessageSchema({
                    sender: from,
                    textMsg: message,
                    isSent: true
                });

                const conv=await Conversation.findOne({$or: [{ source1: from, source2: to }, 
                    { source1: to, source2: from }]});
                if(conv){
                    await Conversation.findOneAndUpdate({_id: conv._id}, {
                        $push:{
                            content: msg
                        }
                    });
                }else{
                    const conversation=new Conversation({
                        source1: from,
                        source2: to,
                        content: [ msg ]
                    });
                    const savedConv=await conversation.save();
                    await User.findOneAndUpdate({_id: {$in: [to, from]}}, {
                        $push:{
                            messages: savedConv._id
                        }
                    });
                }
                return warning(socket, { message: 'Your message was sent successfully!'});
            }else
                return warning(socket, {error: 'The id of the receiver or sender is wrong, try again later!'});
        } catch (error) {
            console.log(error);
            return warning(socket, {error: 'Message could not be sent, try again later!'});   
        
        }
    });
}