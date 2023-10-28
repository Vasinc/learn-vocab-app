const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorControllers = require('./controllers/error')

const wordsRoutes = require('./routes/words_routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(wordsRoutes);

app.use(errorControllers.get404)

mongoose.connect('mongodb+srv://DaniZeu:NtOPCucGQN8u3Epy@cluster0.w4cjk7i.mongodb.net/learnVocab?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err))