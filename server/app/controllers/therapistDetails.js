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

const filterTherapistsByDetails = catchErrorsAsync(async (req, res, next) => {
    // const filter = req.body
    const { methods, themes } = req.body
    const filter = {}
    if (methods) {
        filter.methods = { $all: methods }
    }
    if (themes) {
        filter.themes = { $all: themes }
    }
    console.log(filter)
    const therapistDetailsList = await TherapistDetails.find(filter).populate('therapistId', 'fname')
    res.status(200).json(therapistDetailsList)
})

module.exports = {
    addTherapistDetails,
    getTherapistDetails,
    filterTherapistsByDetails
}