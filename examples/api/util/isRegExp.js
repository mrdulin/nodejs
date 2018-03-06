const util = require('util');

// 验证是否为正则表达式

console.log(util.isRegExp(/some regexp/), typeof util.isRegExp(/some regexp/));
console.log(
  util.inspect(util.isRegExp(new RegExp('another regexp'))),
  typeof util.inspect(util.isRegExp(new RegExp('another regexp')))
);
console.log(util.isRegExp({}));
