const fs = require('fs');

const srcFilepath = 'src.txt';
const destFilepath = 'dest.txt';
const readable = fs.createReadStream(srcFilepath);
const writable = fs.createWriteStream(destFilepath);

readable.pipe(writable);

setTimeout(() => {
  console.log(`停止写入到${destFilepath}`);
  // 解除设置的流
  readable.unpipe(writable);
  console.log('自行关闭文件流');
  writable.end();
}, 1);
