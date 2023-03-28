const express = require('express');
const router = express.Router();
const { getAppointments, bookAppointment, cancelAppointment } = require('../controllers/appointments');
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/:therapistId', getAppointments)
router.put('/book/:appointmentId', verifyToken, bookAppointment)
router.put('/cancel/:appointmentId', verifyToken, cancelAppointment)

module.exports = router