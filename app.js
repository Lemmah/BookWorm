const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

// Use passport to handle sessions.
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId, done);
});

// mongdb connection
mongoose.connect('mongodb://localhost:27017/bookworm', { useNewUrlParser: true });
const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// use session for trackign logins
const sessionOptions = {
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
};
app.use(session(sessionOptions));

// Initialize Passport
app.use(passport.initialize());

// Restore session
app.use(passport.session());

// make user ID available in templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
const routes = require('./routes/');
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
