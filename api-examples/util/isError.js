const util = require('util');

console.log(util.types.isNativeError(new Error()));
console.log(util.types.isNativeError(new TypeError()));
console.log(
  util.types.isNativeError({
    name: 'error',
    message: 'an error occurred',
  }),
);
