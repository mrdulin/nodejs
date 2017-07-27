const fs = require('fs');
process.chdir('examples/concatenation/recipes');

let str = '';

fs.readdir('.', (err, filenames) => {
  if (err) throw err;

  function readFileAt(i) {
    const filename = filenames[i];

    fs.stat(filename, (err, stats) => {
      if (err) throw err;
      if (!stats.isFile()) return readFileAt(i + 1);

      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw err;
        str += data;

        if (i + 1 === filenames.length) {
          return console.log(str);
        }

        readFileAt(i + 1);
      });
    });
  }

  readFileAt(0);
});
