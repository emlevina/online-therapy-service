const Message = require('../models/Message');
const catchErrorsAsync = require('../middleware/catchErrorsAsync');
const { createCustomError } = require('../errors/customError');

const createMessage = catchErrorsAsync(async (req, res) => {
    console.log(req.body)
    const message = await Message.create(req.body)
    res.status(201).json({ message })
})

const getMessages = catchErrorsAsync(async (req, res, next) => {
    console.log(req.params) // passing conversation ID
    if (req.params.messages !== 'undefined') {
        const messages = await Message.find(req.params)
        res.status(200).json(messages)
    } else {
        next(createCustomError('No conversation id in the request', 400))
    }
})

module.exports = { createMessage, getMessages }
