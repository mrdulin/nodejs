const util = require('util');

// 验证是否为错误类型

console.log(util.isError(new Error()));
console.log(util.isError(new TypeError()));
console.log(
  util.isError({
    name: 'error',
    message: 'an error occurred'
  })
);
