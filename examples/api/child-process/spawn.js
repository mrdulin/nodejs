// 使用spawn方法创建子进程，调用系统命令（ls）查询目录清单

const cp = require('child_process');

const { spawn } = cp;

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', data => {
  console.log(`stderr: ${data}`);
});

// 事件说明： http://devdocs.io/node~8_lts/child_process#child_process_class_childprocess
// 对于close和exit事件，其在正常退出时的code为0, 而在非正常退出时的退出码均不为0，一般定义为1～3的数字

ls.on('error', code => {
  console.log(`child process error with code ${code}`);
});

ls.on('close', code => {
  console.log(`child process closed with code ${code}`);
});

ls.on('exit', code => {
  console.log(`child process exited with code ${code}`);
});
