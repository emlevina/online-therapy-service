const express = require('express');
const router = express.Router();
const { register, login, getUsers, getToken, getTherapists } = require('../controllers/users');
const { verifyToken } = require('../middleware/verifyToken')

router.post('/register', register)
router.post('/login', login)
router.get('/users', verifyToken, getUsers)
router.get('/token', verifyToken, (req, res)=>{
    res.status(200).json({ msg: 'Token verified' })
})
router.get('/therapists', verifyToken, getTherapists)

module.exports = router