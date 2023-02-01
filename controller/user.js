const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  // 防止 sql 注入
  username = escape(username)
  password = genPassword(password)
  password = escape(password)
  const sql = `
    select username, realname from users where username=${username} and password=${password};
  `
  return exec(sql).then((rows) => {
    console.log('rows', rows)
    return rows[0] || {}
  })
}

module.exports = {
  login
}
