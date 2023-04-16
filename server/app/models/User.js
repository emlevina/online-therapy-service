const mongoose = require('mongoose');
const emailCheck = require('node-email-check');
const bcrypt = require('bcrypt');
const { createCustomError } = require('../errors/customError');

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        trim: true,
        maxlength: [20, 'First name cannot be more than 20 chars.']
    },
    lname: {
        type: String,
        trim: true,
        maxlength: [20, 'last name cannot be more than 20 chars.']
    },
    email: {
        type: String,
        unique: [true, 'That email is already taken.'],
        required: [true, 'Enter a valid email address.'],
        trim: true,
        lowercase: true,
        validate: [emailCheck.isValid, 'Email is not valid.'],
        maxlength: [200, 'Email cannot be more than 200 chars.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [8, 'Password should be at least 8 characters.'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Retype your password.'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords don\'t match.'
        }
    },
    role: {
        type: String,
        enum: ['user', 'therapist', 'admin'],
        default: 'user'
    },
    therapistId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    userpic: {
        type: String,
        default: 'https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-not-found-circle-icon-vectors-png-image_1737851.jpg'
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
});

UserSchema.post('save', function (err, doc, next) {
    if (err.code && err.code == 11000) {
        next(createCustomError('That email is already taken.', 409))
    } else {
        next(err);
    }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    if (this.therapistId) {
        const therapist = await User.findById(this.therapistId)
        if (!therapist) {
            return next(createCustomError('Therapist does not exist.', 404))
        }
        if (therapist.role !== 'therapist') {
            return next(createCustomError('This user is not a therapist', 404))
        }
    }
    if (this._update.password) {
        if(this._update.password.length < 8){
            return next(createCustomError('Password is not valid', 400))
        }
        const salt = await bcrypt.genSalt();
        this._update.password = await bcrypt.hash(this._update.password, salt);
    }
    next()
})



module.exports = mongoose.model('User', UserSchema)