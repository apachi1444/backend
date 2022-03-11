const mongoose=require('mongoose');

const VideocallSchema=new mongoose.Schema({
    calledAt:{
        type: Date,
        default: ()=>Date.now()
    },
    duration:{
        type: Number,
        default: 0
    },
    callerId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    calledId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
});

const Videocall=mongoose.model('Videocall', VideocallSchema);
module.exports={ Videocall, VideocallSchema };