const Conversation = require('../models/Conversation');
const catchErrorsAsync = require('../middleware/catchErrorsAsync');
const { createCustomError } = require('../errors/customError');

const createConversation = catchErrorsAsync(async (req, res) => {
    const conv = await Conversation.create(req.body)
    res.status(201).json({ msg: 'Conversation created' })
})

const getConversation = catchErrorsAsync(async (req, res) => {
    const conv = await Conversation.findOne({
        $and: [{ participants: req.params.id1 }, { participants: req.params.id2 }]
    })
    res.status(201).json(conv)
})

module.exports = { createConversation, getConversation }
