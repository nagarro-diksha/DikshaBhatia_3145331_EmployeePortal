var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/user-model');

const uri = "mongodb+srv://admin:nimda@cluster0.ilkni.mongodb.net/employee-portal?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log("MONGO DB Error: " + error) );
mongoose.Promise = global.Promise;

require('./authentication/auth');
const routes = require('./routes/users');
const secureRoute = require('./routes/secure-routes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/reister', indexRouter);
app.use('/job-opening/create', indexRouter);
app.use('/job-opening/all', indexRouter);
app.use('/job-opening/update/:id', indexRouter);
app.use('/about', indexRouter);
app.use('/login', indexRouter);
app.use('/register', indexRouter);

//app.use('/about', aboutRouter);
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get('/manager/list-of-opening', function(req, res) {
  res.render('pages/list-of-opening');
});

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('/pages/error');
});

module.exports = app;
