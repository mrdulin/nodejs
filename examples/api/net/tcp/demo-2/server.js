// 创建基本的TCP服务器

const net = require('net');

const host = '127.0.0.1';
const port = 9696;

console.log('Create tcp server...');
// socket其实是对TCP协议的一个基本封装接口，利用socket对象实例可以操作TCP协议的基本功能

const server = net.createServer(socket => {
  console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`);
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

// socket（套接字）概念，网络应用程序通常通过socket向网络发出请求或者应答网络请求
