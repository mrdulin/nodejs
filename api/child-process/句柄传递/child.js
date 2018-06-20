const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`handled by child, pid is ${process.pid}\n`);
});

process.on('message', (msg, tcp) => {
  if (msg === 'server') {
    tcp.on('connection', socket => {
      server.emit('connection', socket);
    });
  }
});
