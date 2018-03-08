const fs = require('fs');

process.chdir('examples/concatenation/recipes');

let str = '';

fs
  .readdirSync('.')
  .filter(filename => fs.statSync(filename).isFile())
  .forEach(filename => {
    str += fs.readFileSync(filename, 'utf8');
  });

console.log(str);
