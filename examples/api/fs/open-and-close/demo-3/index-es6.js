const fs = require('fs');
const path = require('path');
const util = require('util');

const p = path.resolve(__dirname, 'test-es6.txt');
const open = util.promisify(fs.open);
const write = util.promisify(fs.write);
const close = util.promisify(fs.close);

const openFileToWriteAndClose = (buf, callback) => {
  // const notExistPath = '123';
  // 如果文件路径不存在，报{ Error: ENOENT: no such file or directory, open '123' errno: -2, code: 'ENOENT', syscall: 'open', path: '123' }
  open(p, 'a')
    .then(fd => {
      console.log('open file');
      return write(fd, buf).then(() => {
        console.log('write file');
        return fd;
      });
    })
    .then(fd => close(fd))
    .then(() => {
      console.log('close file');
      callback();
    })
    // 如果fs.open()的flags是'r'只读的，报{ Error: EBADF: bad file descriptor, write errno: -9, code: 'EBADF', syscall: 'write' }
    .catch(callback);
};

const message = Buffer.from(`\n网易云音乐 ${Math.random()}\n`);

openFileToWriteAndClose(message, err => {
  if (err) console.error(err);
  console.log('write and close the file success');
});
