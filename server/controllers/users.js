const User = require('../models/User')

const addUser = async (req, res) => {
    console.log(req.body)
    try {
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

module.exports = {
    addUser
}