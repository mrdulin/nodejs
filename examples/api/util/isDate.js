const util = require('util');

console.log(util.isDate(new Date()));
console.log(util.isDate({}));
console.log(util.isDate(Date.now()));
