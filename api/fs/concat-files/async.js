const fs = require('fs');

process.chdir('examples/concatenation/recipes');

let str = '';

fs.readdir('.', (err, filenames) => {
  if (err) throw err;

  function readFileAt(i) {
    const filename = filenames[i];

    fs.stat(filename, (statErr, stats) => {
      if (statErr) throw statErr;
      if (!stats.isFile()) {
        readFileAt(i + 1);
        return;
      }

      fs.readFile(filename, 'utf8', (readErr, data) => {
        if (readErr) throw readErr;
        str += data;

        if (i + 1 === filenames.length) {
          console.log(str);
          return;
        }

        readFileAt(i + 1);
      });
    });
  }

  readFileAt(0);
});
