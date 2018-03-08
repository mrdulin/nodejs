const fs = require('fs');
const path = require('path');

const p = path.normalize('./fs.rename.js');

fs.stat(p, (err, stats) => {
  if (err) throw err;
  console.log(stats);
  if (stats.isFile()) {
    console.log('This is a file');
  }
  if (stats.isDirectory()) {
    console.log('This is a directory');
  }
});

fs.open(p, 'r', (openErr, fd) => {
  if (openErr) throw openErr;
  const readBuffer = Buffer.from(1024);
  const bufferOffset = 0;
  const bufferLength = readBuffer.length;
  const filePosition = 0;

  fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, (readErr, bytesRead, buffer) => {
    if (readErr) throw readErr;
    console.log(`Just read ${bytesRead} bytes`);
    if (bytesRead > 0) {
      console.log(buffer.slice(0, bytesRead).toString('utf8', 0, bytesRead));
    }
  });
});
