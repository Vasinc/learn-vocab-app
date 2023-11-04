const PairOfWords = require('../models/words');
const Parent = require('../models/parents');


exports.showMainPage = (req, res, next) => {
        res.render('index', {
            pageTitle: 'Learn Vocab App',
            path: 'index'
        })
}

exports.addWordsPage = (req, res, next) => {
    Parent.find()
    .then(parents => {
        res.render('add-words', {
            parents: parents,
            pageTitle: 'Add Words',
            path: 'add-words'
        })
    })
}

exports.postParent = (req, res, next) => {
    const parentName = req.body.parentName;
    const parentBackground = req.body.parentBackground;
    const parentTextColor = req.body.parentTextColor;
    const newParent = new Parent({
        parentName: parentName,
        parentBackground: parentBackground,
        parentTextColor: parentTextColor,
        children: []
    })

    newParent.save()
    .then(result => {
        console.log(result)
        res.redirect('/add-words')
    })
}

exports.getRandomWord = (req, res, next) => {
    PairOfWords.getRandomWord()
    .then(randomPairOfWords => {
        res.json({randomPairOfWords: randomPairOfWords})
    })
}