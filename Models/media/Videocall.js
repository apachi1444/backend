const mongoose=require('mongoose');

const VideocallSchema=mongoose.Schema({
    timeStamp:{
        type: Date,
        default: Date.now
    },
    duration:{
        type: Number,
        default: 0
    },
    callerId:{
        type: mongoose.Types.ObjectId
    },
    calledId:{
        type: mongoose.Types.ObjectId
    }
});

const Videocall=mongoose.model('Videocall', VideocallSchema);
module.exports={ Videocall, VideocallSchema };