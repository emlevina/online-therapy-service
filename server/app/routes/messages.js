const express = require('express');
const { createMessage, getMessages } = require('../controllers/messages')
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, createMessage)
router.get('/:conversationId', verifyToken, getMessages)

module.exports = router