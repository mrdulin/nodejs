const cp = require('child_process');
const path = require('path');

const n = cp.fork(path.resolve(__dirname, './sub.js'));

// fork方法会在主进程和子进程之间直接建立一个IPC管道，用于主进程与子进程之间的通信

n.on('message', m => {
  console.log('Parent got message: ', m);
});

n.send({ hello: 'world' });
