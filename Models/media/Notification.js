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
        ref: 'User',
        required: true
    },
    reactedId: {//who receives the reaction
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    reactionType:{
        type: String,
        required: true,
        immutable: true,
        validate:{
            validator: function(r){ return reactions.includes(r);},
            message: 'This is not a valid reaction, learn to react properly!'
        }
    },
    isViewed: {
        type: Boolean,
        default: false
    }
});

const Notification=mongoose.model('Notification', notSchema);
module.exports={ notSchema, Notification }