const express = require('express');
const { createTheme } = require('../controllers/themesAndMethods')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', verifyToken, createTheme)

module.exports = router