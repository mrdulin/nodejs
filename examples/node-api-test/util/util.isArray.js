var util = require('util');

console.log(util.inspect(util.isArray([])));
console.log(util.inspect(util.isArray({})));
console.log(util.inspect(util.isArray(new Array)));