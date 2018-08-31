const fs = require('fs');
const util = require('util');

// 获取文件信息
// 获取文件信息的方法有4个，分别是fs.stat(), fs.statSync(), fs.fstat(), fs.fstatSync();
// fs.stat()与fs.statSync()这两个方法可以直接使用文件路径进行操作
// fs.fstat()与fs.fstatSync()这两个方法需要使用文件描述符进行操作

const fsStat = util.promisify(fs.stat);
const filepath = 'test.txt';
const fileNotExist = 'not-exist-test.txt';

const stat = fs.statSync(filepath);
console.log(`${filepath} file info: ${util.inspect(stat)}`);

fsStat(fileNotExist || filepath)
  .then(value => {
    console.log(`${filepath} file info: ${util.inspect(value)}`);
  })
  .catch(reason => {
    console.error(reason);
  });

const fd = fs.openSync(filepath, 'r');
const fstat = fs.fstatSync(fd);
console.log(`${filepath} file info: ${util.inspect(fstat)}`);
