// 配置环境变量
const env = process.env.NODE_ENV;
// 配置
let MYSQL_CONF;
let REDIS_CONF;

// 开发环境
if(env === 'dev') {
  // mysql
  // 创建连接对象
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql2018',
    port: '3306',
    // 使用 myblog 数据库
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1'
  }
}

// 线上环境
if(env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Mysql2018',
    port: '3306',
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}