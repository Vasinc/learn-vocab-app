const express = require('express');

const wordsControllers = require('../controllers/words_controlers');

const router = express.Router();

router.get('/', wordsControllers.showMainPage);

router.get('/add-words', wordsControllers.addWordsPage)

// router.post('/add-words', wordsControllers.postWords)

router.post('/add-words', wordsControllers.postParent)

router.get('/getRandomWord', wordsControllers.getRandomWord)


module.exports = router;