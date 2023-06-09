const Appointment = require('../models/Appointment')
const User = require('../models/User')
const catchErrorsAsync = require('../middleware/catchErrorsAsync')
const { createCustomError } = require('../errors/customError')

const getTherapistAppointments = catchErrorsAsync(async (req, res, next) => {
    const therapistId = req.params.therapistId

    const therapistAppointments = await Appointment.find({
        therapistId,
        isBooked: false,
        date: { $gte: new Date() }
    }).sort({ date: 1, startTime: 1 })

    res.status(200).json(therapistAppointments)
})

const getUserAppointment = catchErrorsAsync(async (req, res) => {
    const { _id: userId } = req
    if (!userId) {
        res.status(400).json({ msg: 'No user id in request' })
    }
    const appointment = await Appointment.findOne({
        userId
    }).populate('therapistId')
    res.status(200).json(appointment)
})

const bookAppointment = catchErrorsAsync(async (req, res) => {
    const { appointmentId } = req.params
    const { _id: userId } = req
    const appointment = await Appointment.findById(appointmentId)
    if (appointment.isBooked) {
        return res.status(403).json({ msg: 'This time is already booked' })
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
        userId,
        isBooked: true
    })

    res.status(200).json({ msg: 'Booked successfully' })
})

const cancelAppointment = catchErrorsAsync(async (req, res) => {
    const { appointmentId } = req.params
    const { _id: userId } = req
    const appointment = await Appointment.findById(appointmentId)

    if (appointment.userId != userId) {
        return res.status(401).json({ msg: "You cannot cancel other user appointment" })
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
        userId: null,
        isBooked: false
    })
    res.status(200).json({ msg: 'Cancelled successfully' })
})

const createAppointment = catchErrorsAsync(async (req, res) => {
    const { _id, isAdmin } = req
    const { therapistId, date, startTime } = req.body
    if (_id !== therapistId && !isAdmin) {
        return res.status(401).json({ msg: 'Only the therapist or admin can create appointment' })
    }

    const appointment = await Appointment.create({
        therapistId,
        date: new Date(date),
        startTime
    })
    res.status(201).json({ msg: 'Appointment created' })

})

module.exports = {
    getTherapistAppointments,
    getUserAppointment,
    bookAppointment,
    cancelAppointment,
    createAppointment
}