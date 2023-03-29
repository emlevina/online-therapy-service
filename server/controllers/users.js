const emailCheck = require('node-email-check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    // await User.syncIndexes()
    try {
        const { email, password, fname, lname } = req.body

        if (password.length <= 8) {
            return res.status(403).json({ msg: 'Password must be longer than 8 symbols' })
        }
        const isEmailValid = await emailCheck.isValid(email)
        if (!isEmailValid) {
            return res.status(403).json({ msg: 'Email is not valid' })
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            email, hashPassword, fname, lname
        })
        res.status(200).json({ msg: 'Registered successfully' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ msg: 'User with this email already exists' })
    }
}

const generateToken = (req, res, { _id, email }) => {
    const accessToken = jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXP
    })

    res.json({ accessToken })
}

const login = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });

        if (!user.length) {
            return res.status(404).json({ msg: 'Email not found' })
        }
        const { _id, email, hashPassword } = user[0]
        //console.log(email)

        const match = await bcrypt.compare(req.body.password, hashPassword)
        if (!match) {
            return res.status(401).json({ msg: "Wrong password" })
        }

        generateToken(req, res, { _id, email })

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: error.message })
    }
}

const getToken = (req, res) => {
    //    const { _id, email } = req

    //generateToken(req, res, { _id, email })
    res.status(200).json({ msg: 'Token verified' })
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users.map(({ _id, email, fname, lname }) => ({ _id, email, fname, lname })))
    } catch (e) {
        res.status(400).json({ msg: 'Some error occured' })
    }

}

const getTherapists = async (req, res) => {
    try {
        const therapists = await User.find({ role: 'therapist' })
        res.json(therapists.map(({ _id, email, fname, lname }) => ({ _id, email, fname, lname })))
    } catch (e) {
        res.status(400).json({ msg: 'Some error occured' })
    }
    
}

module.exports = {
    register, login, getUsers, getToken, getTherapists
}