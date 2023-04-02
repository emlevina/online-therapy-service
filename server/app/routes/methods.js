const express = require('express');
const { createMethod } = require('../controllers/themesAndMethods')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', verifyToken, createMethod)

module.exports = router