const net = require('net');
const fs = require('fs');

// 监听文件内容变化，输出变化时间

// MacOSX环境，使用终端nc命令测试
// nc hostname port

const filename = process.argv[2];
const port = 5432;

const server = net.createServer(socket => {
  console.log('Subscriber connected.');
  socket.write(`Now watching ${filename} for changes...\n`);

  const watcher = fs.watch(filename, (e, fname) => {
    socket.write(`File ${fname} changed. ${new Date().toLocaleDateString()} \n`);
  });

  socket.on('close', () => {
    console.log('Subscriber disconnected.');
    watcher.close();
  });
});

if (!filename) {
  throw Error('No target filename was specified.');
}

server.listen(port, () => {
  console.log('Listening for subscribers...');
});
