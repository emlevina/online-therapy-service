const mongoose = require('mongoose');
const { createCustomError } = require('../errors/customError')

const ThemeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Theme must have a title'],
        unique: true
    },
    description: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    }
})

ThemeSchema.post('save', function (err, doc, next) {
    if (err.code && err.code == 11000) {
        next(createCustomError('This theme title already exists', 409))
    } else {
        next(err);
    }
});

module.exports = mongoose.model('Theme', ThemeSchema)