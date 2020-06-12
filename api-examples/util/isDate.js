const util = require('util');

console.log(util.types.isDate(new Date()));
console.log(util.types.isDate({}));
console.log(util.types.isDate(Date.now()));
