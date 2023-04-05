const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const catchErrorsAsync = require('../middleware/catchErrorsAsync')

const register = catchErrorsAsync(async (req, res, next) => {
    // await User.syncIndexes()
    const { email, password, passwordConfirm, fname, lname, role } = req.body
    const newUser = await User.create({
        email, password, passwordConfirm, fname, lname, role
    })
    res.status(200).json({ msg: 'Registered successfully' })
})

const generateToken = (req, res, { _id, email }) => {
    const accessToken = jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXP
    })

    res.json({ accessToken })
}

const login = catchErrorsAsync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user) {
        return res.status(404).json({ msg: 'Email not found' })
    }
    const { _id, email, password } = user
    console.log(email, password)
    const match = await bcrypt.compare(req.body.password, password)
    if (!match) {
        return res.status(401).json({ msg: "Wrong password" })
    }
    generateToken(req, res, { _id, email })
})

const getToken = (req, res) => {
    //    const { _id, email } = req

    //generateToken(req, res, { _id, email })
    res.status(200).json({ msg: 'Token verified' })
}

const getUsers = catchErrorsAsync(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

const getTherapists = catchErrorsAsync(async (req, res) => {
    const therapists = await User.find({ role: 'therapist' })
    res.status(200).json(therapists)
})

const getCurrentUser = catchErrorsAsync(async (req, res) => {
    const { _id } = req
    const user = await User.findById(_id).populate('therapistId')
    
    res.status(200).json(user)
})

module.exports = {
    register, login, getUsers, getToken, getTherapists, getCurrentUser
}