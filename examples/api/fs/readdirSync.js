const fs = require('fs');

const files = fs.readdirSync('./test');

console.log('Read directory test: \n', files);
