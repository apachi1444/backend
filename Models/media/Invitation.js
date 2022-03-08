const mongoose=require('mongoose');

const InvitationSchema=mongoose.Schema({
   timeStamp:{
       type: Date,
       default: Date.now
   },
   invitter:{
       type: mongoose.Types.ObjectId,
       required: true
   },
   invitted:{
       type: mongoose.Types.ObjectId,
       required: true
   }
});

const Invitation=mongoose.model('Invitation', InvitationSchema);
module.exports={ Invitation, InvitationSchema };