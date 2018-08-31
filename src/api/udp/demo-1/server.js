const dgram = require('dgram');

const host = '127.0.0.1';
const port = 12345;

console.log('create UDP Server...');
const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const addr = server.address();
  console.log(`UDP server listening on ${addr.address}:${addr.port}`);
});

server.on('message', (msg, rinfo) => {
  console.log(`UDP server received from ${rinfo.address}:${rinfo.port} - ${msg}`);
});

server.on('error', err => {
  console.error('server error: ', err);
  server.close();
});

server.on('close', () => {
  console.log('server closed');
});

server.bind(port, host);

// UDP数据报与TCP数据包区别：
// UDP数据报发送到服务器后，服务器一般是不能会写给客户端的，而TCP包是完全可以的。
// 这点区别是符合UDP与TCP两种协议的设计原理的，UDP协议就是为了快速而安全地发送大数据包而设计的，所以不需要考虑回写等复杂且影响效率的操作
