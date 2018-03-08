const dgram = require('dgram');

const host = '127.0.0.1';
const port = 12345;

const message = Buffer.from('UDP Client to server: Hello Server!');

console.log('create UDP Client...');

const clientUDPSocket = dgram.createSocket('udp4');

clientUDPSocket.send(message, 0, message.length, port, host, err => {
  if (err) throw err;
  console.log(`UDP message send to ${host}:${port}`);
  clientUDPSocket.close();
});

clientUDPSocket.on('close', () => {
  console.log('client disconnected');
});
