const express = require('express')
const router = express.Router()
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (req.query.isadmin) {
    // 管理员界面
    if (req.session.username == null) {
      res.json(new ErrorModel('尚未登录'))
      return
    }
    // 强制查询自己的博客
    author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then((listData) => {
    res.json(new SuccessModel(listData))
  })
})

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id);
  return result.then(data => {
    res.json(new SuccessModel(data));
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result.then(data => {
    res.json(new SuccessModel(data));
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body);
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel('更新博客成功！'))
    }else {
      res.json(new ErrorModel('更新博客失败！！'))
    }
  })
})

router.post('/delete', loginCheck, (req, res, next) => {
  const author = req.session.username;
  const result = deleteBlog(req.query.id, author);
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel('删除博客成功！'))
    }else {
      res.json(new ErrorModel('删除博客失败！！'))
    }
  })
})

module.exports = router
