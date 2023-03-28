const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        maxlength: [20, 'first name cannot be more than 20 chars']
    },
    lname: {
        type: String,
        trim: true,
        maxlength: [20, 'last name cannot be more than 20 chars']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'must provide email'],
        trim: true,
        maxlength: [200, 'email cannot be more than 200 chars']
    },
    hashPassword: {
        type: String,
        required: [true, 'must provide password'],
        maxlength: [72, 'password cannot be more than 72 chars']
    },
    role: {
        type: String,
        enum: ['user', 'therapist', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', UserSchema)