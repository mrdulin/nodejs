const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('../ca/ca.crt')]
};

const socket = tls.connect(
  8000,
  options,
  () => {
    console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(socket);
    process.stdin.resume();
  }
);

socket.setEncoding('utf8');
socket.on('data', data => {
  console.log(data);
});
socket.on('end', () => {
  server.close();
});
