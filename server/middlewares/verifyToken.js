const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createCustomError } = require('../errors/customError');
const catchErrorsAsync = require('../middlewares/catchErrorsAsync')

const verifyToken = catchErrorsAsync((req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];
    if (!authHeader || !accessToken) {
        return next(createCustomError('No access token provided', 401))
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return next(createCustomError('Verification failed', 403))
        }

        req._id = decoded._id
        req.email = decoded.email

        const user = await User.find({
            email: decoded.email
        })

        if (user.length) {
            return next()
        } else {
            return next(createCustomError('No such user', 404))
        }
    })
})

module.exports = { verifyToken }