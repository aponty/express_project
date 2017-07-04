require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 8080;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => res.render('index'));

app.use('/topic', require('./controllers/topics.js'))
app.use('/resources', require('./controllers/resources.js'))
app.use('/notes', require('./controllers/notes.js'))
app.use('/forum', require('./controllers/forum'))
app.use('/events', require('./controllers/events.js'))
app.use('/', require('./controllers/users.js'));

app.listen(port, () => console.log(`Listening on ${port}`));
