const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/js', (req, res) => {
  res.sendFile(__dirname + '/js.html');
});

app.listen(3001);
