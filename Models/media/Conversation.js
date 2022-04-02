const mongoose=require('mongoose');

const MessageSchema=new mongoose.Schema({
    sender:{
        type: mongoose.SchemaTypes.ObjectId ,
        immutable: true
    },
    sentAt:{
        type: Date,
        default: ()=>Date.now(),
        immutable: true
    },
    textMsg:{
        type: String,
        default: "",
        deleted: false
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
    source1:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    source2:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    content: {
        type: [ MessageSchema ]
    }
});

const Conversation=mongoose.model('Conversation', ConversationSchema);
module.exports={ Conversation, ConversationSchema, MessageSchema };