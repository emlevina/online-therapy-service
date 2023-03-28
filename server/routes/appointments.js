const express = require('express');
const router = express.Router();
const {getAppointments} = require('../controllers/appointments');

router.get('/:therapistId', getAppointments)

module.exports = router