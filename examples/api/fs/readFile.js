const fs = require('fs');

// Error: ENOENT: no such file or directory, open 'test/not-exist.txt'
const filepathNotExist = 'test/not-exist.txt';
const filepath = filepathNotExist || 'test/target.txt';

if (fs.existsSync(filepath)) {
  fs.readFile(filepath, (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });
} else {
  console.log(`${filepath} is not existed`);
}
