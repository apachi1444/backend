const mongoose=require('mongoose');

// All the possible reactions between users
const reactions=[
    'comment', 'like', 'dislike', 'love', 'star',
    'videoCall', 'audioCall', 'invitation', 'posted',
    'view', 'message', 'blocked', 'joinNetwork', 'friend',
    'unfriend', 'new'
];
const notSchema=new mongoose.Schema({
    reactedAt:{
        type: Date,
        default: ()=>Date.now()
    },
    reacterId: {//initiates the reaction likes for exp
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    reactedId: {//who receives the reaction
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    reactionType:{
        type: String,
        required: true,
        immutable: true,
        validate:{
            validator: v=>reactions.includes(v),
            message: 'This is not a valid reaction, learn to react properly!'
        }
    }
});

const Notification=mongoose.model('Notification', notSchema);
module.exports={ notSchema, Notification }