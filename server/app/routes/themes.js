const express = require('express');
const { createTheme, getThemes } = require('../controllers/themesAndMethods')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', verifyToken, createTheme)
router.get('/', verifyToken, getThemes)

module.exports = router