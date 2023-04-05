const express = require('express');
const router = express.Router();
const {
    getTherapistAppointments,
    getUserAppointment,
    bookAppointment,
    cancelAppointment, createAppointment
} = require('../controllers/appointments');
const { verifyToken } = require('../middleware/verifyToken')

router.get('/therapist/:therapistId', getTherapistAppointments)
router.get('/user', verifyToken, getUserAppointment)
router.put('/book/:appointmentId', verifyToken, bookAppointment)
router.put('/cancel/:appointmentId', verifyToken, cancelAppointment)
router.post('/', verifyToken, createAppointment)

module.exports = router