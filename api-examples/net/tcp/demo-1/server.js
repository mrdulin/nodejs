const net = require('net');

const chatServe = net.createServer();
const clientList = [];
const port = 9000;

function broadcast(message, client, clientName) {
  const cleanup = [];
  for (let i = 0; i < clientList.length; i += 1) {
    if (client !== clientList[i]) {
      if (clientList[i].writable) {
        clientList[i].write(`${clientName} say: ${message}`);
      } else {
        cleanup.push(clientList[i]);
        clientList[i].destroy();
      }
    }
  }

  for (let i = 0; i < cleanup.length; i += 1) {
    clientList.splice(clientList.indexOf(cleanup[i]), 1);
  }
}

chatServe.on('connection', client => {
  const clientName = `${client.remoteAddress} : ${client.remotePort}`;
  client.write(`Hi! ${clientName}\n`);
  console.log(`${clientName} joined`);

  clientList.push(client);

  client.on('data', data => {
    broadcast(data, client, clientName);
  });

  client.on('end', () => {
    console.log(`${clientName} quit`);
    clientList.splice(clientList.indexOf(client), 1);
  });

  client.on('error', e => {
    console.log(e);
  });
});

chatServe.listen(port, () => {
  console.log(`TCP server is listen on localhost:${port}`);
});
