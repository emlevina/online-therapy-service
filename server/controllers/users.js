const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const catchErrorsAsync = require('../middlewares/catchErrorsAsync')

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
    const user = await User.find({ email: req.body.email });
    if (!user.length) {
        return res.status(404).json({ msg: 'Email not found' })
    }
    const { _id, email, password } = user[0]
    //console.log(email)
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
    const usersWithoutPasswords = users.map(({ _id, email, fname, lname, role }) => (
        { _id, email, fname, lname, role }
    ))
    res.status(200).json(usersWithoutPasswords)
})

const getTherapists = catchErrorsAsync(async (req, res) => {
    const therapists = await User.find({ role: 'therapist' })
    const therapistsWithoutPasswrods = therapists.map(({ _id, email, fname, lname, role }) => (
        { _id, email, fname, lname, role }
    ))
    res.status(200).json(therapistsWithoutPasswrods)
})

module.exports = {
    register, login, getUsers, getToken, getTherapists
}