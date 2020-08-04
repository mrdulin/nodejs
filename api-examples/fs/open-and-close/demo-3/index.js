const fs = require('fs');
const path = require('path');

const p = path.normalize('./test.txt');

function close(error, fd, cb) {
  fs.close(fd, closeErr => {
    console.log('close file');
    cb(error || closeErr);
  });
}

function openFileToWriteAndClose(buf, callback) {
  // 测试openErr
  // 给fs.open()方法一个不存在的文件地址，并设置flags为'r'，会触发Error: ENOENT: no such file or directory, open '123'
  // const notExistPath = '123';
  fs.open(p, 'a', (openErr, fd) => {
    console.log('open file');
    if (openErr) {
      callback(openErr);
    }
    const offset = 0;
    const position = 0;

    // 测试writeErr
    // 给fs.write()方法一个不存在的文件描述符，会触发Error: ENXIO: no such device or address, write
    // fs.open()方法flags设置为'r'只读，再调用fs.write()会触发Error: EBADF: bad file descriptor, write
    fs.write(fd, buf, offset, buf.length, position, writeErr => {
      console.log('write file');
      if (writeErr) {
        close(writeErr, fd, callback);
      }
      close(null, fd, callback);
    });
  });
}

const message = Buffer.from('\nI really want to fuck NodeJs\n', 'utf8');

openFileToWriteAndClose(message, err => {
  if (err) throw err;
  console.log('write and close the file success');
});

exports.openFileToWriteAndClose = openFileToWriteAndClose;
