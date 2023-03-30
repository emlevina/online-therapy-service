const Appointment = require('../models/Appointment')
const User = require('../models/User')
const mongoose = require('mongoose')

const getTherapistAppointments = async (req, res) => {
    try {
        // console.log(req.params.therapistId)
        const therapistId = req.params.therapistId
        const therapist = await User.findById(therapistId)
        if (!therapist || therapist.role !== 'therapist') {
            return res.status(404).json({ msg: 'The therapist does not exist' })
        }

        const list = await Appointment.find({
            therapistId,
            isBooked: false
        })

        res.status(200).json(list)

    } catch (e) {
        // add better error handling
        res.status().json({ msg: 'Therapist not found' })
    }
}
const getUserAppointments = async (req, res) => {
    try {
        const { _id: userId } = req
        if (!userId) {
            res.status(400).json({ msg: 'No user id in request' })
        }
        const list = await Appointment.find({
            userId
        })
        res.status(200).json(list)
    } catch (e) {
        // add better error handling
        res.status(400).json({ msg: 'An error occured' })
    }
}

const bookAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const { _id: userId } = req
        const userCurrentAppointments = await Appointment.find({ userId })
        if (userCurrentAppointments.length) {
            return res.status(403).json({ msg: 'You cannot have 2 appointments' })
        }

        const appointment = await Appointment.findById(appointmentId)
        if (appointment.isBooked) {
            return res.status(403).json({ msg: 'This time is already booked' })
        }

        await Appointment.findByIdAndUpdate(appointmentId, {
            userId,
            isBooked: true
        })

        res.status(200).json({ msg: 'Booked successfully' })
    } catch (e) {
        // add better error handling
        res.status(400).json({ msg: 'An error occured' })
    }
}
const cancelAppointment = async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.status(400).json({ msg: 'An error occured' })
    }
}

const createAppointment = async (req, res) => {
    //check start time
    //check that user sending is admin or the therapist
    try {
        console.log(req.body)
        const { _id } = req
        const { therapistId, date, startTime } = req.body
        if(_id !== therapistId){
            return res.status(401).json({ msg: 'Only the therapist can create appointment'})
        }
        // if(startTime > 24 || startTime < 0){
        //     return res.status(400).json({msg: 'Appointment time should be a number between 0 and 24'})
        // }
        const appointment = await Appointment.create({
            therapistId,
            date: new Date(date),
            startTime
        })
        res.status(201).json({ msg: 'Appointment created' })
    } catch (e) {
        console.log(e)
        // if(e instanceof mongoose.ValidationError){
        //     return res.status(400).json({msg: e.message})
        // }
        res.status(400).json({ msg: 'An error occured' })
    }
}

module.exports = {
    getTherapistAppointments,
    getUserAppointments,
    bookAppointment,
    cancelAppointment,
    createAppointment
}