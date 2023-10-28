const PairOfWords = require('../models/words');


exports.showMainPage = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Learn Vocab App',
        path: 'index'
    })
}

exports.addWordsPage = (req, res, next) => {
    res.render('add-words', {
        pageTitle: 'Add Words',
        path: 'add-words'
    })
}

exports.postWords = (req, res, next) => {
    const firstWord = req.body.firstWord;
    const secondWord = req.body.secondWord;
    const newPair = new PairOfWords({
        firstWord: firstWord,
        secondWord: secondWord
    });
    newPair.save()
    .then(result => {
        console.log(req.body)
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

exports.renderPracticePage = (req, res) => {
    res.render('practice', {
        pageTitle: 'Practice',
        path: '/practice',
    });
};

exports.getRandomWord = (req, res, next) => {
    PairOfWords.getRandomWord()
    .then(randomPairOfWords => {
        res.json({randomPairOfWords: randomPairOfWords})
    })
}