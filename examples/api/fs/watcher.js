const fs = require('fs');

// 监控文件

// fs.watch方法与fs.watchFile方法不是完全跨平台的，且在某些情况下是不可用的。这是因为此功能需要依赖
// 操作系统底层提供的方法来监视文件系统的变化。

const filename = 'test/target.txt';
const filenameNotExist = 'test/not-exist-target.txt';

console.log('Now watching the target.txt for changes...');

const watcher = fs.watch(filenameNotExist || filename);

watcher.on('change', (eventType, fname) => {
  switch (eventType) {
    case 'rename':
      console.log(`file ${fname} renamed`);
      break;
    case 'change':
      console.log(`file ${fname} changed`);
      break;
    default:
      break;
  }
});

watcher.on('error', err => {
  console.log('filename is not correct');
  if (err) throw err;
});
