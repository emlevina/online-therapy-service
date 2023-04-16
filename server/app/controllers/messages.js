const Message = require('../models/Message');
const catchErrorsAsync = require('../middleware/catchErrorsAsync');
const { createCustomError } = require('../errors/customError');

const createMessage = catchErrorsAsync(async (req, res) => {
    const message = await Message.create(req.body)
    res.status(201).json({ message })
})

const getMessages = catchErrorsAsync(async (req, res, next) => {
    if (req.params.conversationId !== 'undefined') {
        const messages = await Message.find({ conversationId: req.params.conversationId })
        res.status(200).json(messages)
    } else {
        next(createCustomError('No conversation id in the request', 400))
    }
})

module.exports = { createMessage, getMessages }
