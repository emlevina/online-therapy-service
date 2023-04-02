const Theme = require('../models/Theme');
const Method = require('../models/Method');
const catchErrorsAsync = require('../middleware/catchErrorsAsync')
const { createCustomError } = require('../errors/customError')

const createTheme = catchErrorsAsync(async (req, res, next) => {
    const theme = await Theme.create(req.body)
    res.status(201).json({ msg: 'Theme created' })
})

const createMethod = catchErrorsAsync(async (req, res, next) => {
    const theme = await Method.create(req.body)
    res.status(201).json({ msg: 'Method created' })
})

module.exports = {
    createTheme,
    createMethod
}