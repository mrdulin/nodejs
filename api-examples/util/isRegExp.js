const util = require('util');

console.log(util.types.isRegExp(/some regexp/));
console.log(util.types.isRegExp(new RegExp('another regexp')));
console.log(util.types.isRegExp({}));
console.log(util.types.isRegExp('a'));
console.log(util.types.isRegExp(true));
