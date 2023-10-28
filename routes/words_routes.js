const express = require('express');

const wordsControllers = require('../controllers/words_controlers');

const router = express.Router();

router.get('/', wordsControllers.showMainPage);

router.get('/add-words', wordsControllers.addWordsPage)

router.post('/add-words', wordsControllers.postWords)

router.get('/practice', wordsControllers.renderPracticePage);

router.get('/getRandomWord', wordsControllers.getRandomWord)


module.exports = router;