// 查看子进程pid的方法

const cp = require('child_process');

const { spawn } = cp;

const grepNode = spawn('grep', ['node']);
console.log('grepNode pid: ', grepNode.pid);
grepNode.stdin.end();

// pid, process Identifier, 进程标识符
