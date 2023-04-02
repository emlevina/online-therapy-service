const mongoose = require('mongoose');
const { createCustomError } = require('../errors/customError')

const MethodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Method must have a title'],
        unique: true
    },
    description: {
        type: String,
        default: null
    }
})

MethodSchema.post('save', function (err, doc, next) {
    if (err.code && err.code == 11000) {
        next(createCustomError('This method already exists', 409))
    } else {
        next(err);
    }
});

module.exports = mongoose.model('Method', MethodSchema)