const path = require('path');

const aPath = path.resolve(__dirname, '/src/');

console.log('resolve', __dirname, aPath);
console.log('join', path.join(__dirname, 'src'))