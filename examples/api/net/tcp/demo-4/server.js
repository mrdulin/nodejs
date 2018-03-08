// 控制socket数据流

const net = require('net');

const host = '127.0.0.1';
const port = 9696;
let dataSwitch = 'on';

console.log('Create tcp server...');

const server = net.createServer(socket => {
  console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`);

  if (dataSwitch === 'on') {
    // 暂停socket的data事件
    socket.pause();
    dataSwitch = 'off';
  } else {
    // 恢复socket的data事件
    socket.resume();
    dataSwitch = 'on';
  }

  // 接收客户端发来的数据
  socket.on('data', data => {
    // 输出由客户端的地址和发来的消息
    console.log(`DATA ${socket.remoteAddress}: ${data}`);

    // 回发该数据，客户端将收到来自服务端的数据
    socket.write(`Server write: ${data}`);
  });

  // 服务器关闭时触发close事件
  socket.on('close', () => {
    console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
