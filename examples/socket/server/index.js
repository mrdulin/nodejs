const express = require('express');
const app = express();
const path = require('path');


const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:63342");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/lib', express.static(path.resolve(__dirname, '../../../node_modules')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

io.on('connection', (socket) => {
  socket.emit('me', { name: 'novaline', age: 23 });
  socket.on('say', (data) => {
    socket.send(data);
  });
});

server.listen(port, () => {
  process.stdout.write(`Chat server listen on port ${port}`);
});
