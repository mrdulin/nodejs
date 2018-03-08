const fs = require('fs');
const path = require('path');

const p = path.normalize('./test.txt');

fs.stat(p, (err, stats) => {
  if (err) throw err;
  // console.log(stats);
  if (stats.isFile()) {
    console.log('This is a file');
  }
  if (stats.isDirectory()) {
    console.log('This is a directory');
  }
});

// 对于操作系统内核而言，所有打开的文件都通过文件描述符引用。文件描述符是一个非负整数，当打开一个现有文件或创建一个新文件时，内核向进程返回一个文件描述符。
fs.open(p, 'r', (openErr, fd) => {
  if (openErr) throw openErr;
  const buf = Buffer.alloc(1024);
  const offset = 0;
  const len = buf.length;
  const pos = 0;

  fs.read(fd, buf, offset, len, pos, (readErr, bytesRead, buffer) => {
    if (readErr) throw readErr;
    console.log(`Just read ${bytesRead} bytes`);
    if (bytesRead > 0) {
      console.log(buffer.slice(0, bytesRead).toString('utf8', 0, bytesRead));
    }
  });
});
