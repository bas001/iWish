var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var wishlistRouter = require('./routes/wishlist');
var wishRouter = require('./routes/wish');
var usersRouter = require('./routes/db');
var loginRouter = require('./routes/login');
var expressMongoDb = require('express-mongo-db');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({ secret: 'example' }));

app.use('/login', loginRouter);

app.use(function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next();
    }
});


app.use(expressMongoDb("mongodb://localhost:27017/test"));
//app.use(expressMongoDb(process.env.MONGODB_URI));

app.use('/', indexRouter);
app.use('/wishlist', wishlistRouter);
app.use('/dashboard', dashboardRouter);
app.use('/wishlist', wishRouter);
app.use('/db', usersRouter);

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
  res.render('error');
});

module.exports = app;
