var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const fs = require('fs')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis');

// var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express()

// // view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

// 环境变量
const ENV = process.env.NODE_ENV
if(ENV !== 'production') {
  // 开发环境
  app.use(logger('dev', {
    stream: process.stdout
  }))
}else {
  // 上线环境
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {flags: 'a'});
  app.use(logger('combined', {
    stream: writeStream
  }))
}
// 设置 Content-Type
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 解析 cookie
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

const sessionStore = new RedisStore({
  client: redisClient
})

// 解析 session
app.use(session({
  secret: 'Gg@5521_',
  cookie: {
    // // 默认配置
    // path:  '/',
    // httpOnly: true,
    // cookie 有效期 单位 ms
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

// app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
