const fs = require('fs');
const path = require('path');

const oldPath = path.normalize('./file_system.js');
const newPath = path.normalize('./path.js');

// 异步
fs.rename(oldPath, newPath, err => {
  console.log(err);
});

const oldPathSync = path.normalize('./fs.renametest');
const newPathSync = path.normalize('./renameTest.txt');

// 同步
fs.renameSync(oldPathSync, newPathSync);
