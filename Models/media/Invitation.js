const mongoose=require('mongoose');

const InvitationSchema=new mongoose.Schema({
   sentAt:{
       type: Date,
       default: ()=>Date.now()
   },
   invitter:{
       type: mongoose.SchemaTypes.ObjectId,
       required: true,
       ref: 'User'
   },
   invitted:{
       type: mongoose.SchemaTypes.ObjectId,
       required: true,
       ref: 'User'
   }
});

const Invitation=mongoose.model('Invitation', InvitationSchema);
module.exports={ Invitation, InvitationSchema };