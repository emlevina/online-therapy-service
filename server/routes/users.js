const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/users');
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/register', register)
router.post('/login', login)
router.get('/users', verifyToken, getUsers)

module.exports = router