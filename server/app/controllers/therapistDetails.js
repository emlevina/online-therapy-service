const TherapistDetails = require('../models/TherapistDetails');
const catchErrorsAsync = require('../middleware/catchErrorsAsync');
const { createCustomError } = require('../errors/customError');

const addTherapistDetails = catchErrorsAsync(async (req, res, next) => {
    await TherapistDetails.create(req.body)
    res.status(201).json({ msg: 'Details added' })
})

const getTherapistDetails = catchErrorsAsync(async (req, res, next) => {
    const therapistId = req.params.therapistId
    const therapistDetails = await TherapistDetails.findOne({ therapistId }).populate('themes').populate('methods')
    res.status(200).json(therapistDetails)
})

module.exports = {
    addTherapistDetails,
    getTherapistDetails
}