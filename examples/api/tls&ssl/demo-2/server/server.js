const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  ca: [fs.readFileSync('../ca/ca.crt')]
};

const server = tls.createServer(options, socket => {
  console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});

server.listen(8000, () => {
  console.log('server bound');
});
