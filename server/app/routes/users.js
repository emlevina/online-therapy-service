const express = require('express');
const router = express.Router();
const { register, login, getUsers, getCurrentUser, getToken, getTherapists, updateCurrentUser } = require('../controllers/users');
const { verifyToken } = require('../middleware/verifyToken')

router.post('/register', register)
router.post('/login', login)
router.get('/users', verifyToken, getUsers)
router.get('/users/user', verifyToken, getCurrentUser)
router.put('/users', verifyToken, updateCurrentUser)
router.get('/token', verifyToken, (req, res)=>{
    res.status(200).json({ msg: 'Token verified' })
})
router.get('/therapists', verifyToken, getTherapists)

module.exports = router