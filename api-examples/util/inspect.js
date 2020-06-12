const util = require('util');

// 将任意对象转换为字符串

function Person() {
  this.name = 'person';
  this.sayHello = function () {
    return this.name;
  };
}

const obj = new Person();
console.log(obj, typeof obj);
console.log(util.inspect(obj), typeof util.inspect(obj));
console.log(util.inspect(obj, true));
