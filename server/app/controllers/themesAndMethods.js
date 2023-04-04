const Theme = require('../models/Theme');
const Method = require('../models/Method');
const catchErrorsAsync = require('../middleware/catchErrorsAsync')
const { createCustomError } = require('../errors/customError')

const createTheme = catchErrorsAsync(async (req, res, next) => {
    const theme = await Theme.create(req.body)
    res.status(201).json({ msg: 'Theme created' })
})

const getThemes = catchErrorsAsync(async (req, res, next) => {
    const themes = await Theme.find({})
    res.status(200).json(themes)
})

const createMethod = catchErrorsAsync(async (req, res, next) => {
    const method = await Method.create(req.body)
    res.status(201).json({ msg: 'Method created' })
})
const getMethods = catchErrorsAsync(async (req, res, next) => {
    const methods = await Method.find({})
    res.status(200).json(methods)
})

module.exports = {
    createTheme,
    getThemes,
    createMethod,
    getMethods
}