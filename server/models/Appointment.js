const mongoose = require('mongoose')

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
        ref: 'User'
    }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)