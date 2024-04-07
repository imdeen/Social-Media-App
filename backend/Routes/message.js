const express = require('express');
const { addMessage ,getMessage } = require('../Controllers/messageController.js');
const router = express.Router();

router.post('/', addMessage);
router.get('/:chatId', getMessage);

module.exports = router