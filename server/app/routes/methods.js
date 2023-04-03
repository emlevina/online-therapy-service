const express = require('express');
const { createMethod, getMethods } = require('../controllers/themesAndMethods')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', verifyToken, createMethod)
router.get('/', verifyToken, getMethods)

module.exports = router