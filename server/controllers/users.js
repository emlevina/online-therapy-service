const emailCheck = require('node-email-check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    // await User.syncIndexes()
    try {
        const { email, password, fname, lname } = req.body

        if (password.length <= 8) {
            throw new Error('Password must be longer than 8 symbols')
        }
        const isEmailValid = await emailCheck.isValid(email)
        if (!isEmailValid) {
            throw new Error('Email is not valid')
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            email, hashPassword, fname, lname
        })
        res.status(200).json(newUser)
    } catch (e) {
        console.log(e)
        res.status(400).json({ errorClass: e.constructor.name, error: e.message })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });

        if (!user.length) {
            return res.status(404).json({ msg: 'Email not found' })
        }
        const { _id, email, hashPassword } = user[0]

        const match = await bcrypt.compare(req.body.password, hashPassword)
        if (!match) {
            return res.status(400).json({ msg: "Wrong password" })
        }
        const accessToken = jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 60000
        })

        res.json({ accessToken })

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const token = async (req, res) => {

}

const getUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users.map(({ _id, email, fname, lname }) => ({ _id, email, fname, lname })))
}

module.exports = {
    register, login, getUsers
}