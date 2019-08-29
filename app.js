const createError = require('http-errors');
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)


const indexRouter = require('./server/routes/index');
const usersRouter = require('./server/routes/users');
const boardRouter = require('./server/routes/board')

const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, 'server', 'views', 'pages'));
app.set('view engine', 'ejs');

// Server Setting
require('dotenv').config()
app.set('port', process.env.PORT || 52273)
require('./server/config/passport')(passport)

// * DB Mongoose
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser : true,
})
.then(() => {
  console.log("Info - Mongoose : Connected Successfully")
})
.catch((err) => {
  console.error("Error - Mongoose : Connected Failled Error Info :", err)
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(session({
  resave : true,
  saveUninitialized : false,
  secret : process.env.SESSION_SECRET,
  cookie : {
    httpOnly : true,
    secure : false,
    maxAge : 1000 * 60 * 15,
  },
  store : new MongoStore({
    url : process.env.DB_URL,
    collection : 'sessions'
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let error = new Error("Not Found Error")
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message : err.message,
      error : err
  });
});

app.listen(app.get('port'), () => {
  console.log("Running Server PORT :", app.get('port'))
})