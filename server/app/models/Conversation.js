const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    participants: {
        type: [
            mongoose.Types.ObjectId
        ],
        validate: { 
            validator: v => Array.isArray(v) && v.length > 1 ,
            message: 'Conversation should have at least 2 participants'
        },
    },
    lastMessage: Date,
})


module.exports = mongoose.model('Conversation', ConversationSchema)