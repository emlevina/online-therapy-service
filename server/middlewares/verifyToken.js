const jwt = require('jsonwebtoken');
const User = require('../models/User')

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.split(" ")[1];
        if (!authHeader || !accessToken) {
            return res.status(401).json({ msg: 'No access token provided' })
        }

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ msg: 'Verification failed' })

            req._id = decoded._id
            req.email = decoded.email

            const user = await User.find({
                email: decoded.email
            })

            if (user.length) {
                return next()
            } else {
                return res.status(400).json({ msg: 'No such user' })
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({ msg: 'Problem' })
    }

}

module.exports = { verifyToken }