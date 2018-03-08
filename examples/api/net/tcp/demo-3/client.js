const net = require('net');

const host = '127.0.0.1';
const port = 8877;

// 使用net.connect()方法创建一个TCP客户端实例
const socketClient = net.connect(port, host, () => {
  console.log('client connected');
  socketClient.end('Hello! Server');
});

socketClient.on('end', () => {
  console.log('client disconnected');
});
