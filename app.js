const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mongoConnect = require('./util/database').mongoConnect;

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorControllers = require('./controllers/error')

const wordsRoutes = require('./routes/words_routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(wordsRoutes);

app.use(errorControllers.get404)

mongoConnect(client => {
    app.listen(3000);
})