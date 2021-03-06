var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var usersDB = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  console.log(req.body);
  console.log(req.url);
  next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);

app.get('/login', (req, res) => {
  if (req.cookies.test === 'true') {
    res.json({authorized: true});
  } else {
    res.json({authorized: false});
  }
})

app.post('/login', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  res.cookie('test', 'true');
  res.status(201).json(req.body);
})

app.post('/register', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  var { username, password } = req.body;

  if (usersDB[username]) {
    res.json({userExists: true});
  } else {
    usersDB[username] = password;
    console.log('Current UserDB: ', usersDB);
    res.json(req.body);    
  }

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
