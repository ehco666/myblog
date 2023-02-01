const express = require('express')
const router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then((data) => {
    if (data.username) {
      // 设置 session
      // console.log('req.session: --->', req.session);
      req.session.username = data.username
      req.session.realname = data.realname

      res.json(new SuccessModel(data.username + ' 登录成功啦'))
      return
    }
    res.json(new ErrorModel('登录失败啦！'))
  })
})

// router.get('/login-test', (req, res, next) => {
//   if (req.session.username) {
//     res.json({
//       errno: 0,
//       msg: '登录成功',
//     })
//     return
//   }
//   res.json({
//     errno: -1,
//     msg: '登录失败',
//   })
// })

// router.get('/session-test', (req, res, next) => {
//   const session = req.session;
//   if(session.num == null) {
//     session.num = 0;
//   }
//   session.num++
//   res.json({num: session.num});
// })

module.exports = router
