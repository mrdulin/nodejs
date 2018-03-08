const fs = require('fs');

function isFile(filename, callback) {
  fs.stat(filename, (err, stats) => {
    if (err) callback(err);
    console.log('fs.stat', new Date().getTime());
    callback(null, stats.isFile());
  });
}

module.exports = isFile;
