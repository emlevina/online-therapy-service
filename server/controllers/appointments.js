const Appointment = require('../models/Appointment')

const getTherapistAppointments = async (req, res) => {
    try {
        console.log(req.params.therapistId)
        const list = await Appointment.find({
            therapistId: req.params.therapistId,
            isBooked: false
        })
        res.json(list)
    } catch (e) {
        // add better error handling
        res.json({ msg: 'nothing' })
    }
}
const getUserAppointments = async (req, res) => {
    try {
        const { _id: userId } = req
        if(!userId){
            res.status(400).json({ msg: 'No user id in request'})
        }
        const list = await Appointment.find({
            userId
        })
        res.json(list)
    } catch (e) {
        // add better error handling
        res.json({ msg: 'nothing' })
    }
}

const bookAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const { _id: userId } = req
        const userCurrentAppointments = await Appointment.find({ userId })
        if (userCurrentAppointments.length) {
            return res.status(400).json({ msg: 'You cannot have 2 appointments' })
        }

        const appointment = await Appointment.findById(appointmentId)
        if (appointment.isBooked) {
            return res.status(400).json({ msg: 'This time is already booked' })
        }

        await Appointment.findByIdAndUpdate(appointmentId, {
            userId,
            isBooked: true
        })

        res.status(200).json({ msg: 'Booked successfully' })
    } catch (e) {
        // add better error handling
        res.json({ msg: 'nothing' })
    }
}
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const { _id: userId } = req
        const appointment = await Appointment.findById(appointmentId)

        if (appointment.userId != userId) {
            return res.status(400).json({ msg: "You cannot cancel other user appointment" })
        }

        await Appointment.findByIdAndUpdate(appointmentId, {
            userId: null,
            isBooked: false
        })
        res.status(200).json({ msg: 'Cancelled successfully' })
    } catch (e) {
        // add better error handling
        res.json({ msg: 'nothing' })
    }
}

module.exports = {
    getTherapistAppointments,
    getUserAppointments,
    bookAppointment,
    cancelAppointment
}