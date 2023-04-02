const mongoose = require('mongoose');
const { createCustomError } = require('../errors/customError');
const User = require('./User')

const AppointmentSchema = new mongoose.Schema({
    therapistId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Time slot must be assigned to a therapist.'],
    },
    date: {
        type: Date,
        required: [true, 'Time slot must have some date.']
    },
    startTime: {
        type: Number,
        required: [true, 'Time slot must have some time.'],
        min: [0, 'Time should be between 0 and 24'],
        max: [24, 'Time should be between 0 and 24']
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    userId: {
        default: null,
        type: mongoose.Types.ObjectId,
        ref: 'User',
        index: {
            unique: true,
            partialFilterExpression: { userId: { $type: "objectId" } }
        }
    }
})

AppointmentSchema.pre('find', async function (next) {
    console.log('I am models pre middleware')
    // console.log(this)
    //console.log(this._conditions.therapistId)
    if (!mongoose.isValidObjectId(this._conditions.therapistId)) {
        console.log('regex check')
        return next(createCustomError(`Provided therapist id is not valid`, 400))
    }
    const therapist = await User.findById(this._conditions.therapistId)
    if (!therapist) {
        return next(createCustomError('Therapist does not exist.', 404))
    }
    if (therapist.role !== 'therapist') {
        return next(createCustomError('This user is not a therapist', 404))
    }
    next()
})

AppointmentSchema.pre('save', async function (next) {
    const therapist = await User.findById(this.therapistId)
    if (!therapist) {
        return next(createCustomError('Therapist does not exist.', 404))
    }
    if (therapist.role !== 'therapist') {
        return next(createCustomError('This user is not a therapist', 404))
    }
    next()
})

AppointmentSchema.pre('findOneAndUpdate', async function (err, doc, next) {
    const user = await User.findById(this.userId)
    if (!user) {
        return next(createCustomError('User does not exist.', 404))
    }
    next()
});

AppointmentSchema.post('findOneAndUpdate', function (err, doc, next) {
    if (err.code && err.code == 11000) {
        next(createCustomError('One user cannot have 2 appointments.', 409))
    } else {
        next(err);
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema)