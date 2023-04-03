const express = require('express');
const { addTherapistDetails, getTherapistDetails, filterTherapistsByDetails } = require('../controllers/therapistDetails')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', verifyToken, addTherapistDetails)
router.post('/filter', verifyToken, filterTherapistsByDetails)
router.get('/:therapistId', verifyToken, getTherapistDetails)

module.exports = router