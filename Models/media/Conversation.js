const mongoose=require('mongoose');

const ConvSchema=new mongoose.Schema({
    owners:{
        type: [ mongoose.SchemaTypes.ObjectId ]
    },
    sentAt:{
        type: Date,
        default: ()=>Date.now(),
        immutable: true
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
const ConversationSchema=new mongoose.Schema({
    sourceId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    targetId:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    content: {
        type: [ ConvSchema ]
    }
});

const Conversation=mongoose.model('Conversation', ConversationSchema);
module.exports={ Conversation, ConversationSchema };