let ObjectId = require('mongodb').ObjectId;
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
    if (req.body.condition == 'addParent') {
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
            res.redirect('/add-words')
        })
    } else if (req.body.condition == 'addChild') {
        const parentId = req.body.selectedParent
        Parent.find({_id: parentId})
        .then(parent => {
            const childName = req.body.childName;
            const childBackground = req.body.childBackground;
            const childTextColor = req.body.childTextColor;
            const newChild = {
                childName: childName,
                childBackground: childBackground,
                childTextColor: childTextColor,
                words: []
            }
            const updatedChildren = [...parent[0].children, newChild];
            Parent.findOneAndUpdate({_id: parentId}, {children: updatedChildren})
            .then(result => {
                res.redirect('/add-words')
            })
            
        })
    }
}

exports.getRandomWord = (req, res, next) => {
    PairOfWords.getRandomWord()
    .then(randomPairOfWords => {
        res.json({randomPairOfWords: randomPairOfWords})
    })
}