const cp = require('child_process');

const { spawn } = cp;

const ls = spawn('ls', ['-lh', '/err']);

ls.stdout.on('data', data => {
  console.log(`stdout: ${data}`);
});

// 注意和`ls.on('error')`事件区分
// 这里是ls子进程执行命令时发生的错误
ls.stderr.on('data', data => {
  console.log(`stderr: ${data}`);
});

// ls时ChildProcess类的实例, 继承了EventEmitters，所以有.on()等方法。

// 这里是ls子进程创建以及其他2个过程中发生的错误

// 'error'事件触发条件：
// 无法创建子进程。
// 进程无法kill。
// 向子进程发送消息失败。

ls.on('error', code => {
  console.log('child process error with code: ', code);
});

ls.on('close', code => {
  console.log('child process closed with code: ', code);
});

ls.on('exit', code => {
  console.log('child process exited with code: ', code);
});
