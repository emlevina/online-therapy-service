const express = require('express');
const { addTherapistDetails, getTherapistDetails } = require('../controllers/therapistDetails')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', verifyToken, addTherapistDetails)
router.get('/:therapistId', verifyToken, getTherapistDetails)

module.exports = router