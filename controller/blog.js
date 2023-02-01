const { exec, escape } = require('../db/mysql')
const xss = require('xss')

// 博客列表数据
const getList = (author, keyword) => {
  // 在author和keyword不确定的情况下 1=1 会起到占位的作用使 where关键字起作用，防止sql语句报错；
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回的是一个promise
  return exec(sql)
}

// 博客详情数据
const getDetail = (id) => {
  // select 语句返回的是一个数组，update，insert into，delete等语句返回的是一个对象里面包含了操作后的信息
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then((rows) => {
    // console.log(rows);
    return rows[0]
  })
}

// 新增博客的数据
const newBlog = (blogData = {}) => {
  // blogData 就是一个博客对象，包含 title content author createTime 等属性
  let { title, content, author } = blogData
  title = xss(escape(title))
  content = xss(escape(content))
  author = escape(author)
  const createTime = Date.now()
  const sql = `
    insert into blogs (title, content, author, createtime)
    values (${title}, ${content}, ${author}, ${createTime});
  `
  return exec(sql).then((insertData) => {
    console.log('insertData:---> ', insertData)
    return {
      id: insertData.insertId,
    }
  })
}

// 更新博客数据
const updateBlog = (id, blogData = {}) => {
  // id 就是要更新的对应博客的id
  // blogData 就是一个博客对象，包含 title content 等属性
  let { title, content } = blogData
  title = xss(escape(title))
  content = xss(escape(content))
  const sql = `
    update blogs set title=${title}, content=${content} where id=${id};
  `
  return exec(sql).then((updateData) => {
    console.log('updateData:---> ', updateData)
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 删除博客数据
const deleteBlog = (id, author) => {
  // 同时添加 id 与 author 字段进行验证，保证一个用户只能删除自己的文章，不能删除其他用户的文章
  author = escape(author)
  const sql = `delete from blogs where id='${id}' and author=${author};`
  return exec(sql).then((delData) => {
    console.log('delData: ---> ', delData, author)
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
}
