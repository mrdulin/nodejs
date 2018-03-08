// 创建TCP客户端

const net = require('net');

const host = '127.0.0.1';
const port = 9696;

const socketClient = net.connect(port, host, () => {
  console.log('client connected');
  socketClient.write('client B write: Hello Server!');
});

// 接受服务端发来的数据
socketClient.on('data', data => {
  console.log(data.toString());

  // 关闭客户端
  // 如果是socketClient.end(data), 等同于先调用socketClient.write(data)方法，再调用socketClient.end()
  socketClient.end();
});

socketClient.on('end', () => {
  console.log('client disconnected');
});
