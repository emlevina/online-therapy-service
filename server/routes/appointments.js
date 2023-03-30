const express = require('express');
const router = express.Router();
const {
    getTherapistAppointments,
    getUserAppointments,
    bookAppointment,
    cancelAppointment, createAppointment
} = require('../controllers/appointments');
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/therapist/:therapistId', getTherapistAppointments)
router.get('/user', verifyToken, getUserAppointments)
router.put('/book/:appointmentId', verifyToken, bookAppointment)
router.put('/cancel/:appointmentId', verifyToken, cancelAppointment)
router.post('/', verifyToken, createAppointment)

module.exports = router