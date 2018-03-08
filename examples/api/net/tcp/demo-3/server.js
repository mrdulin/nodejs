// 监听事件

const net = require('net');

const host = '127.0.0.1';
const port = 8877;

const server = net.createServer();

// server.listen()方法执行后，listening事件会被触发
server.on('listening', () => {
  console.log(`Server is listening on: ${host}:${port}`);

  // 获取服务器地址参数
  // 注意：server.address()方法必须在listening事件被触发后再使用，否则无效
  const addr = server.address();
  console.log('opened server on %j', addr);
});

// 监听来自客户端的连接请求
server.on('connection', socket => {
  console.log('Server has a new connection');

  // 获取套接字地址，类似server.address();
  console.log(`socket address: ${socket.localAddress}:${socket.localPort}`);
  // 或者使用socket.address(), 与server.address()得到的结果一致
  console.log('socket address v2: %j', socket.address());

  socket.on('data', data => {
    console.log(`Data from ${socket.remoteAddress}:${socket.remotePort} is: ${data}`);
  });

  // 客户端断开链接会触发
  socket.on('close', () => {
    console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`);
  });

  // 获取当前服务器连接数
  server.getConnections((error, count) => {
    if (error) {
      console.info(error.message);
    } else {
      console.info('current connections: ', count);
    }
  });

  // server.close();
});

// 调用server.close()会触发，TCP服务器关闭
server.on('close', () => {
  console.log('Server is now closed');
});

server.on('error', err => {
  console.log('Server error occurred: ', err);
});

server.listen(port, host);
