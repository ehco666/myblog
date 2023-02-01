// 定义数据模型
class BaseModel {
  constructor(data, message) {
    if(typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if(data) {
      this.data = data;
    }
    if(message) {
      this.message = message;
    }
  }
}

// 请求成功
class SuccessModel extends BaseModel {
  constructor (data, message) {
    // 执行父类的构造函数
    super(data, message);
    this.errno = 0;
  }
}

// 请求失败
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}