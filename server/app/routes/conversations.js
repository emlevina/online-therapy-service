const express = require('express');
const { createConversation, getConversation } = require('../controllers/conversations')
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, createConversation)
router.get('/:id1/:id2', verifyToken, getConversation)

module.exports = router