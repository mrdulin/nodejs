const fs = require('fs');
const path = require('path');

const buf = Buffer.from(JSON.stringify({ name: 'dulin' }));
const pkgBuf = fs.readFileSync(path.resolve(__dirname, '../../../package.json'));

const json = JSON.parse(buf);
const pkgJson = JSON.parse(pkgBuf);

console.log(json);
console.log(pkgJson);
