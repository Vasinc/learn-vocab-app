const express = require('express');

const wordsControllers = require('../controllers/words_controlers');

const router = express.Router();

router.get('/', wordsControllers.showMainPage);

module.exports = router;