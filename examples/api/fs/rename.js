const fs = require('fs');
const path = require('path');

const oldPath = path.normalize('./file_system.js');
const newPath = path.normalize('./path.js');

fs.rename(oldPath, newPath, err => {
  console.log(err);
});
