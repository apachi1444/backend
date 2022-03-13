const mongoose=require('mongoose');

const AudiocallSchema=mongoose.Schema({
    calledAt:{
        type: Date,
        default: ()=>Date.now(),
        immutable: true
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

const Audiocall=mongoose.model('Audiocall', AudiocallSchema);
module.exports={ Audiocall, AudiocallSchema };