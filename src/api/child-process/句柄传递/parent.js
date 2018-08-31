const cp = require('child_process');
const cpus = require('os').cpus();
const net = require('net');

const children = [];
for (let i = 0; i < cpus.length; i++) {
  const child = cp.fork('./child.js');
  children.push(child);
}
const port = 1337;

const server = net.createServer();
server.listen(port, () => {
  children.forEach(child => {
    child.send('server', server);
  });
  server.close();
});
