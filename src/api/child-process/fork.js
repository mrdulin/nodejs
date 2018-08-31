// 使用fork方法获取CPU信息

const cp = require('child_process');
const os = require('os');
const path = require('path');

const { fork } = cp;

for (let i = 0; i < os.cpus().length; i += 1) {
  console.log('Fork a new child_process now...');
  fork(path.resolve(__dirname, 'test/worker.js'));
}
