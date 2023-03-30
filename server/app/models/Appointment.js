const mongoose = require('mongoose');
const { createCustomError } = require('../errors/customError')

const AppointmentSchema = new mongoose.Schema({
    therapistId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Time slot must be assigned to a therapist'],
    },
    date: {
        type: Date,
        required: [true, 'Time slot must have some date']
    },
    startTime: {
        type: Number,
        required: [true, 'Time slot must have some time'],
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

AppointmentSchema.post('findOneAndUpdate', function (err, doc, next) {
    if (err.code && err.code == 11000) {
        next(createCustomError('One user cannot have 2 appointments.', 409))
    } else {
        next(err);
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema)