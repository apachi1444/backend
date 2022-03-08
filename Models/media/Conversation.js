const mongoose=require('mongoose');

const ConvSchema=mongoose.Schema({
    owners:{
        type: [ mongoose.Types.ObjectId ]
    },
    timeStamp:{
        type: Date,
        default: Date.now
    },
    textMsg:{
        type: String,
        default: ""
    },
    isRead:{
        type: Boolean,
        default: false
    },
    isSent:{
        type: Boolean,
        default: false
    },
    isReceived:{
        type: Boolean,
        default: false
    }
});
const ConversationSchema=mongoose.Schema({
    sourceId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    DestId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    content: {
        type: [ ConvSchema ]
    }
});

const Conversation=mongoose.model('Conversation', ConversationSchema);
module.exports={ Conversation, ConversationSchema };