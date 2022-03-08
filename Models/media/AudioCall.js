const mongoose=require('mongoose');

const AudiocallSchema=mongoose.Schema({
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

const Audiocall=mongoose.model('Audiocall', AudiocallSchema);
module.exports={ Audiocall, AudiocallSchema };