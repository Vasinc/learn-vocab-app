const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wordsSchema = new Schema({
    firstWord: {
        type: String,
        required: true
    },
    secondWord: {
        type: String,
        required: true
    }
})

wordsSchema.statics.getRandomWord = async function() {
    const numberOfDocuments = await this.countDocuments();

    if(numberOfDocuments === 0) {
        throw 'There are no words added!'
    }

    const randomNumber = Math.floor(Math.random() * numberOfDocuments);

    const randomPairOfWords = await this.findOne().skip(randomNumber).exec();

    return randomPairOfWords
}

module.exports = mongoose.model('PairOfWords', wordsSchema);