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
        required: [true, 'Time slot must have some time']
    },
    isBooked: {
        type: Boolean,
        default: null
    },
    userId: {
        default: null,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)